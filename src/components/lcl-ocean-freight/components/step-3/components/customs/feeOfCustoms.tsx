import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { IQuotationCustoms } from '@/components/lcl-ocean-freight/interface';
import TableFeeOfCustoms from './tableFeeCustoms';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

interface Props {
  dataAPIResearch: IQuotationCustoms | undefined;
  setSubmitFeeCustoms: React.Dispatch<
    React.SetStateAction<ISubmitFeeCustoms[]>
  >;
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
  dataAPIResearch,
  setSubmitFeeCustoms,
}: Props) {
  const [dataFee, setDataFee] = useState<ISeaQuotationFeeFormValue[]>([]);

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
    setDataFee(
      dataAPIResearch?.listFeeGroup.map((value, index) => ({
        feeGroupID: value.feeGroupID,
        feeGroupName: value.feeGroupName,
      })) || []
    );
  }, [dataAPIResearch]);

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
