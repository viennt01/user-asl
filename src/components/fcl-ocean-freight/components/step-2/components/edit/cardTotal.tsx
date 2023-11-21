import React from 'react';
import { Card, Flex } from 'antd';
import COLORS from '@/constants/color';

export default function CardTotal() {
  return (
    <Card style={{ border: '1px solid' }}>
      <Flex style={{ width: '100%' }} vertical>
        <Flex style={{ width: '100%' }} justify="space-between">
          <div style={{ fontSize: '16px', fontWeight: '500' }}>
            Container type:{' '}
          </div>
          <div
            style={{
              fontSize: '16px',
              fontWeight: '600',
              color: COLORS.GREY_COLOR_HOVER,
            }}
          >
            100,000,000
          </div>
        </Flex>
        <Flex style={{ width: '100%' }} justify="space-between">
          <div style={{ fontSize: '16px', fontWeight: '500' }}>
            Other Charge:{' '}
          </div>
          <div
            style={{
              fontSize: '16px',
              fontWeight: '600',
              color: COLORS.GREY_COLOR_HOVER,
            }}
          >
            100,000,000
          </div>
        </Flex>
        <div
          style={{
            width: '100%',
            height: '1px',
            background: COLORS.BLACK,
            margin: '16px 0',
          }}
        />
        <Flex style={{ width: '100%' }} justify="space-between">
          <div style={{ fontSize: '16px', fontWeight: '700' }}>Subtotal: </div>
          <Flex vertical>
            <Flex>
              <div
                style={{
                  color: '#FFE600',
                  fontSize: '16px',
                  fontWeight: '700',
                  marginRight: '4px',
                }}
              >
                VND
              </div>
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: COLORS.GREY_COLOR_HOVER,
                }}
              >
                100,000,000
              </div>
            </Flex>
            <Flex>
              <div
                style={{
                  color: '#FFE600',
                  fontSize: '16px',
                  fontWeight: '700',
                  marginRight: '4px',
                }}
              >
                USD
              </div>
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: COLORS.GREY_COLOR_HOVER,
                }}
              >
                100,000
              </div>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
