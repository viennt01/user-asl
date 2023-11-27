import React, { useState } from 'react';
import style from './index.module.scss';
import {
  Button,
  Card,
  Col,
  Flex,
  Row,
  Image,
  Modal,
  ConfigProvider,
  Form,
  Select,
  SelectProps,
  Checkbox,
} from 'antd';
import COLORS from '@/constants/color';
import CustomerInformation from './components/customer-information';
import ShipmentDetail from './components/shipment-details';
import QuotationDetail from './components/quotation-detail';
import TermsConditions from './components/terms-conditions';
import OtherServiceCharges from './components/other-service-charges';
import Finish from './components/finish';
import { MailOutlined, FilePdfOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import ROUTERS from '@/constants/router';
// @ts-ignore
import html2pdf from 'html2pdf.js';
interface Props {
  displayStep: number;
  setDisplayStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function Step5({ displayStep, setDisplayStep }: Props) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const options: SelectProps['options'] = [];

  const onFinish = (formValues: any) => {
    console.log(formValues);
    setIsModalOpen(false);
    form.resetFields();
  };
  const onChange = () => {
    setIsChecked(!isChecked);
  };

  const handlePrint = () => {
    // Get the HTML element to print
    var element = document.getElementById('content-to-print');

    if (!element) {
      console.error('Element not found.');
      return;
    }

    // Specify the parameters for html2pdf
    var parameters = {
      filename: 'Booking.pdf',
    };

    const pdf1 = html2pdf(element, parameters);
    pdf1.output('datauristring').then((pdf: any) => console.log(pdf));
  };

  return (
    <div
      className={style.step5}
      style={{
        display: displayStep === 5 ? '' : 'none',
      }}
    >
      <div className={style.container}>
        <Flex style={{ marginBottom: '16px' }} justify="space-between">
          <Button
            style={{ color: '#DE231B', border: '1px solid #DE231B' }}
            icon={<MailOutlined />}
            onClick={showModal}
          >
            Send Email
          </Button>

          <Button
            icon={<FilePdfOutlined />}
            onClick={handlePrint}
            style={{ background: '#DE231B', color: COLORS.WHITE }}
          >
            Download PDF
          </Button>
        </Flex>
        <Card className={style.cardMain} title="Review Booking">
          <Row gutter={26}>
            <div
              id="content-to-print"
              style={{
                width: '100%',
                padding: '0 16px',
              }}
            >
              <Col
                span={24}
                style={{
                  marginBottom: '24px',
                }}
              >
                <Image
                  src={'/images/oceanFreight/contactAsl.png'}
                  preview={false}
                  style={{
                    width: '100%',
                  }}
                />
              </Col>
              <CustomerInformation />
              <ShipmentDetail />
              <QuotationDetail />
              <TermsConditions />
              <OtherServiceCharges />
              <Finish />
            </div>

            <Col span={24} style={{ marginTop: '16px' }}>
              <ConfigProvider
                theme={{
                  components: {
                    Checkbox: {
                      fontSize: 16,
                      controlInteractiveSize: 20,
                    },
                  },
                }}
              >
                <Checkbox
                  value={isChecked}
                  onChange={onChange}
                  style={{ marginBottom: '16px', fontWeight: 600 }}
                >
                  I confirm the accuracy of the information provided above.
                </Checkbox>
              </ConfigProvider>
              <Flex justify="center">
                <Button
                  style={{ width: '150px', height: '40px' }}
                  type="primary"
                  onClick={() => router.push(ROUTERS.BOOKINGS_HISTORY)}
                  disabled={!isChecked}
                >
                  Submit booking
                </Button>
              </Flex>
            </Col>
          </Row>
        </Card>

        <Modal
          title="Send Email"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={[]}
        >
          <Form form={form} onFinish={onFinish}>
            <Row>
              <Col span={24}>
                <Form.Item
                  label={'To'}
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter email address',
                    },
                  ]}
                >
                  <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    placeholder="Please enter email address"
                    options={options}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Flex justify="flex-end" key="back">
                  <Button
                    onClick={handleCancel}
                    style={{ marginRight: '16px' }}
                  >
                    Cancel
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Send
                  </Button>
                </Flex>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
