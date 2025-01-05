import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Chip } from '@mui/material';
import DataTable from './DataTable.jsx';
import HomePage from './HomePage.jsx';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'GENERAL',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'table',
    title: 'Table',
    icon: <ShoppingCartIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'sales',
        title: 'Sales',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'traffic',
        title: 'Traffic',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: 'integrations',
    title: 'Integrations',
    icon: <LayersIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DashboardLayoutBasic(props) {
  const { window } = props;

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <BrowserRouter>
      <AppProvider
        navigation={NAVIGATION}
        theme={demoTheme}
        window={demoWindow}
        branding={{
          logo: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src="/logo.webp"
                alt=" logo"
                style={{ width: '100px', height: 'auto', marginTop: '1px' }}
              />
              <Chip
                label="Free"
                size="small"
                style={{
                  marginLeft: '8px',
                  fontWeight: 'bold',
                  backgroundColor: 'black',
                  color: 'white',
                  fontSize: '13px',
                  padding: '1px 4px',
                  borderRadius: '5px',
                }}
              />
            </div>
          ),
          title: ' ',
        }}
      >
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/table" replace />} />
            <Route path="/dashboard" element={<HomePage />} />
            <Route path="/table" element={<DataTable />} />
          </Routes>
        </DashboardLayout>
      </AppProvider>
    </BrowserRouter>
  );
}

DashboardLayoutBasic.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default DashboardLayoutBasic;
