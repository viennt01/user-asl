import React, { useEffect, useState } from 'react';
import style from './index.module.scss';
import {
  Button,
  Card,
  Col,
  Flex,
  Row,
  Image,
  Modal,
  Form,
  Select,
  SelectProps,
} from 'antd';
import COLORS from '@/constants/color';
import { MailOutlined, FilePdfOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import ROUTERS from '@/constants/router';
import FormBooking from '../../form-booking';
import { IDataBookingProps } from '../..';
import { sendFilePdfBooking } from '../../fetcher';
interface Props {
  displayStep: number;
  dataPropsBooking: IDataBookingProps;
}

export default function Step5({ displayStep, dataPropsBooking }: Props) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    // Dynamically import html2pdf only on the client side
    const importHtml2pdf = async () => {
      // @ts-ignore
      const { default: html2pdf } = await import('html2pdf.js');
      window.html2pdf = html2pdf;
    };

    importHtml2pdf();

    return () => {
      // Cleanup: Remove html2pdf from the window object when the component unmounts
      if (window.html2pdf) {
        delete window.html2pdf;
      }
    };
  }, []);

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

  const handlePrint = async () => {
    // Ensure html2pdf is available in the window object
    if (window.html2pdf) {
      // Get the HTML element to print
      const element = document.getElementById('content-to-print');

      if (!element) {
        console.error('Element not found.');
        return;
      }

      // Specify the parameters for html2pdf
      const parameters = {
        filename: 'Booking.pdf',
      };

      const pdf = window.html2pdf(element, parameters);

      // Output the PDF as a data URL
      const dataUrl = await pdf.output('datauristring');

      // Create a Blob from the data URL
      const blob = await fetch(dataUrl).then((res) => res.blob());

      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append('pdfFile', blob, 'Booking.pdf');
      sendFilePdfBooking(formData)
    } else {
      console.error('html2pdf is not available.');
    }
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
              <FormBooking dataPropsBooking={dataPropsBooking} />
            </div>

            <Col span={24} style={{ marginTop: '16px' }}>
              <Flex justify="center">
                <Button
                  style={{ width: '190px', height: '40px' }}
                  type="primary"
                  onClick={() => router.push(ROUTERS.BOOKINGS_HISTORY)}
                >
                  Go to booking history
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
