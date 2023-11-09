import { Layout } from 'antd';
const { Content } = Layout;

interface Props {
  children: React.ReactNode;
}
export function PageWithNoLayout(props: Props) {
  return (
    <Layout className="app-layout">
      <Layout>
        <Content>{props.children}</Content>
      </Layout>
    </Layout>
  );
}
