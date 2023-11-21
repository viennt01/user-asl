import React from 'react';
import style from '../index.module.scss';
import { Flex } from 'antd';

export default function HeaderFclOceanFreight() {
    return (
        <div className={style.header}>
            <Flex
                className={style.contentHeader}
                justify={'space-between'}
                align={'center'}
            >
                <Flex
                    className={style.stepActive}
                    justify={'center'}
                    align={'center'}
                >
                    <Flex className={style.no} justify={'center'} align={'center'}>
                        1
                    </Flex>
                    <Flex
                        className={style.contentStep}
                        justify={'center'}
                        align={'center'}
                    >
                        Check price
                    </Flex>
                </Flex>
                <Flex className={style.step} justify={'center'} align={'center'}>
                    <Flex className={style.no} justify={'center'} align={'center'}>
                        2
                    </Flex>
                    <Flex
                        className={style.contentStep}
                        justify={'center'}
                        align={'center'}
                    >
                        Booking
                    </Flex>
                </Flex>
                <Flex className={style.step} justify={'center'} align={'center'}>
                    <Flex className={style.no} justify={'center'} align={'center'}>
                        3
                    </Flex>
                    <Flex
                        className={style.contentStep}
                        justify={'center'}
                        align={'center'}
                        style={{ width: '145px' }}
                    >
                        Recommend Service
                    </Flex>
                </Flex>
                <Flex className={style.step} justify={'center'} align={'center'}>
                    <Flex className={style.no} justify={'center'} align={'center'}>
                        4
                    </Flex>
                    <Flex
                        className={style.contentStep}
                        justify={'center'}
                        align={'center'}
                        style={{ width: '120px' }}
                    >
                        Review Booking
                    </Flex>
                </Flex>
                <Flex className={style.step} justify={'center'} align={'center'}>
                    <Flex className={style.no} justify={'center'} align={'center'}>
                        5
                    </Flex>
                    <Flex
                        className={style.contentStep}
                        justify={'center'}
                        align={'center'}
                    >
                        Finish
                    </Flex>
                </Flex>
            </Flex>
        </div>

    );
}
