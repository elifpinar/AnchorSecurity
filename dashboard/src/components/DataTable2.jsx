import * as React from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

const severityLevels = ['Critical', 'High', 'Medium', 'Low', 'Informational'];

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'description', label: 'Description', minWidth: 170, align: 'left' },
  { id: 'severity', label: 'Severity', minWidth: 170, align: 'center' },
];

function DataTable2() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [data, setData] = React.useState([]);
  const [selectedSeverities, setSelectedSeverities] = React.useState(() => {
    const savedSeverities = sessionStorage.getItem('selectedSeverities');
    return savedSeverities ? JSON.parse(savedSeverities) : severityLevels;
  });

  const theme = useTheme(); // For dark theme support

  const token = '8Jp6PNe5nLzcZRqEzM4oUy5CpoGQGySbdUjlPXcqbfQlhPGgTosszVcOuaosaf-7UjTBgKhKEc-jzCsIJTOpIQ';

  const fetchData = () => {
    axios.post('/api/scan/list', { token })
      .then(response => {
        console.log('API Yanıtı:', response.data);
        setData(response.data.value.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSeverityChange = (event) => {
    const { target } = event;
    const value = typeof target.value === 'string' ? target.value.split(',') : target.value;
    setSelectedSeverities(value);
    sessionStorage.setItem('selectedSeverities', JSON.stringify(value)); // Save selected severities to sessionStorage
  };

  const getSeverityLevel = (score) => {
    if (score >= 8) {
      return 'Critical';
    } else if (score >= 6) {
      return 'High';
    } else if (score >= 4) {
      return 'Medium';
    } else if (score >= 2) {
      return 'Low';
    } else {
      return 'Informational';
    }
  };

  const getSeverityStyles = (severity) => {
    switch (severity) {
      case 'Critical':
        return { backgroundColor: 'purple', color: 'white' };
      case 'High':
        return { backgroundColor: '#d81b60', color: 'white' };
      case 'Medium':
        return { backgroundColor: 'orange', color: 'white' };
      case 'Low':
        return { backgroundColor: 'green', color: 'white' };
      case 'Informational':
        return { backgroundColor: '#03a9f4', color: 'white' };
      default:
        return {};
    }
  };

  const getSeverityTooltip = (severity) => {
    switch (severity) {
      case 'Critical':
      case 'High':
        return "Take action immediately. Exploitation could result in privileged unauthorized access to systems, significant data loss, or downtime.";
      case 'Medium':
        return "Vulnerabilities that can not be exploited directly. However, it can help attackers or can be triggered by manipulating other systems or victims.";
      case 'Low':
        return "Typically have very little or no impact.";
      case 'Informational':
        return "Indicates non-critical findings that pose no security risk. These are useful insights or configuration details for system analysis and improvement.";
      default:
        return "";
    }
  };

  const filteredRows = data
    .filter((row) => row.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((row) => selectedSeverities.includes(getSeverityLevel(row.score)));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormControl sx={{ width: 300 }}>
          <InputLabel>Severity</InputLabel>
          <Select
            multiple
            value={selectedSeverities}
            onChange={handleSeverityChange}
            input={<OutlinedInput label="Severity" />}
            renderValue={(selected) => selected.join(', ')}
          >
            {severityLevels.map((level) => (
              <MenuItem key={level} value={level}>
                <Checkbox checked={selectedSeverities.includes(level)} />
                <ListItemText primary={level} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <TableContainer sx={{ maxHeight: 690 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const severity = getSeverityLevel(row.score);
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell align="center">
                      <Tooltip title={getSeverityTooltip(severity)} arrow>
                        <Chip
                          label={severity}
                          style={getSeverityStyles(severity)}
                        />
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default DataTable2;
