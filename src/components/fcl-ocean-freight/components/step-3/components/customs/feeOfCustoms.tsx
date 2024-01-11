import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { IQuotationCustoms } from '@/components/fcl-ocean-freight/interface';
import TableFeeOfCustoms from './tableFeeCustoms';
import { IDataStep2Props } from '@/components/fcl-ocean-freight';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

interface Props {
  dataFee: ISeaQuotationFeeFormValue[];
  setSubmitFeeCustoms: React.Dispatch<
    React.SetStateAction<ISubmitFeeCustoms[]>
  >;
  dataStep2PropsBooking: IDataStep2Props | undefined;
}

export interface ISeaQuotationFeeFormValue {
  feeGroupID: string;
  feeGroupName: string;
}

export interface ISubmitFeeCustoms {
  feeGroupID: string;
  listFee: React.Key[];
}

export default function FeeOfCustoms({
  dataFee,
  setSubmitFeeCustoms,
  dataStep2PropsBooking,
}: Props) {

  const [activeKey, setActiveKey] = useState('1');
  const [idActive, setIdActive] = useState<string[]>([]);

  const defaultPanes =
    dataFee?.map((value) => {
      return {
        label: `${value.feeGroupName}`,
        children: (
          <TableFeeOfCustoms
            idFeeGroup={value.feeGroupID}
            setSubmitFeeCustoms={setSubmitFeeCustoms}
            dataStep2PropsBooking={dataStep2PropsBooking}
          />
        ),
        key: `${value.feeGroupID}`,
      };
    }) || [];

  const [items, setItems] = useState(defaultPanes);
  const onChange = (key: string) => {
    setActiveKey(key);
  };

  useEffect(() => {
    setItems(defaultPanes);
    if (dataFee) {
      setIdActive(dataFee.map((value) => value.feeGroupID));
    }
    if (defaultPanes && defaultPanes.length > 0) {
      setActiveKey(defaultPanes[0].key);
    }
  }, [dataFee]);

  const remove = (targetKey: TargetKey) => {
    const targetIndex = items.findIndex((pane) => pane.key === targetKey);
    const newPanes = items.filter((pane) => pane.key !== targetKey);
    setSubmitFeeCustoms((pre) => {
      const filteredData = pre.filter(function (item) {
        return item.feeGroupID !== targetKey;
      });
      return filteredData;
    });
    if (newPanes.length && targetKey === activeKey) {
      const { key } =
        newPanes[
          targetIndex === newPanes.length ? targetIndex - 1 : targetIndex
        ];
      setActiveKey(key);
    }
    setItems(newPanes);
  };

  const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
    remove(targetKey);
  };

  return (
    <>
      <Tabs
        hideAdd={true}
        onChange={onChange}
        activeKey={activeKey}
        type="editable-card"
        onEdit={onEdit}
        items={items}
      />
    </>
  );
}
