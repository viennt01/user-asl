import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import {
  FeeTable,
  IQuotationCustomsTable,
} from '@/components/fcl-ocean-freight/interface';
import TableFeeOfCustoms from './tableFeeCustoms';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

interface Props {
  selectedRowKeys: React.Key[];
  setSelectedRowKeys: React.Dispatch<React.SetStateAction<React.Key[]>>;
  selectedRow: IQuotationCustomsTable[];
  setSelectedRow: React.Dispatch<
    React.SetStateAction<IQuotationCustomsTable[]>
  >;
}

export interface ISeaQuotationFeeFormValue {
  feeGroupID: string;
  feeGroupName: string;
}

export interface ISubmitFeeCustoms {
  feeGroupID: string;
  listFee: FeeTable[];
}

export default function FeeOfCustoms({
  selectedRowKeys,
  setSelectedRowKeys,
  selectedRow,
  setSelectedRow,
}: Props) {
  const [dataFee, setDataFee] = useState<ISeaQuotationFeeFormValue[]>([]);
  const [submitFeeCustoms, setSubmitFeeCustoms] = useState<ISubmitFeeCustoms[]>(
    []
  );
  const [activeKey, setActiveKey] = useState('1');
  const [idActive, setIdActive] = useState<string[]>([]);

  const defaultPanes =
    dataFee?.map((value) => {
      return {
        label: `${value.feeGroupName}`,
        children: (
          <TableFeeOfCustoms
            idFeeGroup={value.feeGroupID}
            submitFeeCustoms={submitFeeCustoms}
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
      selectedRow[0]?.listFeeGroup.map((value, index) => ({
        feeGroupID: value,
        feeGroupName: `Fee Group ${index + 1}`,
      })) || []
    );
  }, [selectedRow]);

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
