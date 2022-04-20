import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editValue, getData } from '../../store/actions';

import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    minWidth: 650
  }
});

const RegionsTable = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { regionsData } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const [years, setYears] = useState([]);
  const [headers, setHeaders] = useState([]);
  const computeYearsFromJson = () => {
    if (regionsData) {
      let newYears = [];

      const yearsFromJson = Object.entries(regionsData)
        .map((item) => Object.entries(item[1].G))
        .map((item) => item.map((el) => el[0]))
        .reduce((prev, current) => [...prev, ...current], []);

      yearsFromJson.forEach((el) => {
        if (newYears.includes(el)) return;
        newYears.push(el);
      });

      return newYears;
    }

    return [];
  };

  const computeHeadersFromJson = () => {
    if (regionsData) {
      let newheaders = [];

      const headersFromJson = Object.entries(regionsData)
        .map((item) => Object.entries(item[1].G))
        .map((item) => Object.entries(item[1]))
        .map((item) => Object.keys(item[1][1]))
        .reduce((prev, current) => [...prev, ...current], []);

      headersFromJson.forEach((el) => {
        if (newheaders.includes(el)) return;
        newheaders.push(el);
      });
      return newheaders;
    }

    return [];
  };

  const preparedHeaders = useMemo(computeHeadersFromJson, [regionsData]);
  const preparedYears = useMemo(computeYearsFromJson, [regionsData]);

  useEffect(() => {
    setYears(preparedYears);
  }, [preparedYears]);

  useEffect(() => {
    setHeaders(preparedHeaders);
  }, [preparedHeaders]);

  function createData(regions, ...rest) {
    return { regions, ...rest };
  }

  let rows = [];
  if (regionsData && years && headers) {
    rows = Object.entries(regionsData).map((item) => {
      const reg = item[0];

      const temp = years.map((el) => {
        const data = headers.map((head) => {
          if (item[1].G[el]?.[head].value === undefined) {
            return '';
          } else {
            return item[1].G[el]?.[head].value;
          }
        });
        const ww =
          item[1].G[el]?.YY.value === undefined || item[1].G[el]?.ZZ.value === undefined
            ? ''
            : item[1].G[el]?.YY.value * item[1].G[el]?.ZZ.value;

        return [...data, ww];
      });

      const dataRowTemp = temp.reduce((prev, current) => [...prev, ...current], []);

      return createData(reg, ...dataRowTemp);
    });
  }

  const regionHeading = [...headers, 'WW'];

  const handleOpenPopup = (e, item, row, index) => {
    const column = regionHeading[index % regionHeading.length];

    if (item[1] && column !== 'WW') {
      const region = row.find((el) => el[0] === 'regions')[1];
      const year = years[Math.floor(index / regionHeading.length)];

      window.openerCallback = function (newValue) {
        dispatch(
          editValue({
            region,
            year,
            column,
            value: newValue
          })
        );
      };
      window.cellValue = item[1];
      window.open('#/popup');
    }
  };

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label='regions table'>
        <TableHead>
          <TableRow>
            <TableCell />
            {years?.map((year) => (
              <TableCell align='center' colSpan={4} key={year}>
                {year}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>regions</TableCell>
            {years?.map((year) =>
              regionHeading.map((title) => (
                <TableCell align='center' key={`${year}${title}`}>
                  {title}
                </TableCell>
              ))
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.regions}>
              <TableCell component='td' scope='row'>
                {row.regions}
              </TableCell>
              {Object.entries(row).map((item, index, row) => {
                if (item[0] === 'regions') return null;
                return (
                  <TableCell
                    align='center'
                    key={`${row.regions}${index}`}
                    onClick={(e) => handleOpenPopup(e, item, row, index)}
                    sx={{ cursor: 'pointer' }}>
                    {item[1]}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default RegionsTable;
