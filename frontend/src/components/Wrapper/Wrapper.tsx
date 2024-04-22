import React from 'react';
import block from 'bem-cn-lite';
import { Text, ThemeProvider } from '@gravity-ui/uikit';

import './Wrapper.scss';

const b = block('wrapper');

export type AppProps = {
  children: React.ReactNode;
};

export const Wrapper: React.FC<AppProps> = ({ children }) => (
  <ThemeProvider theme="dark">
    <div className={b()}>
      <header>
        <Text variant="body-3">Прототип системы ведения заявок</Text>
      </header>
      <div className={b('content')}>{children}</div>
    </div>
  </ThemeProvider>
);
