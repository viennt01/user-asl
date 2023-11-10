import { Layout } from 'antd';
const { Content } = Layout;

interface Props {
  children: React.ReactNode;
}
export function PageWithNoLayout({ children }: Props) {
  return (
    <Layout className="app-layout">
      <Layout>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
}
