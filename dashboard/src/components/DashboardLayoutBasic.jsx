import * as React from 'react';
import PropTypes from 'prop-types';
import { createTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Chip } from '@mui/material';
import DataTable from './DataTable.jsx';
import HomePage from './HomePage.jsx';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SubjectIcon from '@mui/icons-material/Subject';
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import CropFreeRoundedIcon from '@mui/icons-material/CropFreeRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import RecordVoiceOverTwoToneIcon from '@mui/icons-material/RecordVoiceOverTwoTone';
const NAVIGATION = [
  {
    kind: 'header',
    title: 'GENERAL',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <GridViewRoundedIcon />,
  },
  
  {
    segment: 'assetmanager',
    title: 'Asset Manager',
    icon: <WorkRoundedIcon />,
    
  },
  {
    segment: 'table',
    title: 'Scan Manager',
    icon: <CropFreeRoundedIcon />,
    children: [
      {
        segment: ' ',
        title: 'Start Scan',
        icon: <FiberManualRecordRoundedIcon fontSize='small'/>,
      },
      {
        segment: 'scanactivities',
        title: 'Scan Activities',
        icon: <FiberManualRecordRoundedIcon fontSize='small'/>,
      },
      {
        segment: 'aibasedscangenerator',
        title: 'AI Based Scan Generator',
        icon: <FiberManualRecordRoundedIcon fontSize='small'/>,
      },
    ],
  },
  {
    segment: 'outputs',
    title: 'Outputs',
    icon: <SubjectIcon />,
    children: [
      {
        segment: 'scanreports',
        title: 'Scan Reports',
        icon: <FiberManualRecordRoundedIcon fontSize='small'/>,
      },
      {
        segment: 'crawlerresults',
        title: 'Crawler Results',
        icon: <FiberManualRecordRoundedIcon fontSize='small'/>,
      },
      {
        segment: 'securityreports',
        title: 'security.txt Reports',
        icon: <FiberManualRecordRoundedIcon fontSize='small'/>,
      },
      {
        segment: 'dataexplorer',
        title: 'Data Explorer',
        icon: <FiberManualRecordRoundedIcon fontSize='small'/>,
      },
      {
        segment: 'smartassistant',
        title: 'Smart Assistant',
        icon: <FiberManualRecordRoundedIcon fontSize='small'/>,
      },
    ],
  },
  {
    segment: 'awareness',
    title: 'Awareness',
    icon: <AccountBalanceIcon />,
    children: [
      {
        segment: 'startscan',
        title: 'Start Scan',
        icon: <FiberManualRecordRoundedIcon fontSize='small'/>,
      },
      {
        segment: 'scanactivities',
        title: 'Scan Activities',
        icon: <FiberManualRecordRoundedIcon fontSize='small'/>,
      },
      {
        segment: 'aibasedscangenerator',
        title: 'AI Based Scan Generator',
        icon: <FiberManualRecordRoundedIcon fontSize='small'/>,
      },
    ],
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'SUPPORT',
  },
  {
    segment: 'supportTicket',
    title: 'Support Ticket',
    icon: <RecordVoiceOverTwoToneIcon />,
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
  
  window: PropTypes.func,
};

export default DashboardLayoutBasic;
