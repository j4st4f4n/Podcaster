import Header from '../components/header/Header';

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;
