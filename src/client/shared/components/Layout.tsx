import React from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

interface Props {
  children: any[] | any
}

export function Layout({ children }: Props) {
  return (
    <React.Fragment>
      <Header />
      {children}
      <Footer />
    </React.Fragment>
  );
}