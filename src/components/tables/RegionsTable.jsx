import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../store/actions';

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
  };

  const preparedYears = useMemo(computeYearsFromJson, [regionsData]);

  useEffect(() => {
    setYears(preparedYears);
  }, [preparedYears]);

  const regionHeading = ['XX', 'YY', 'ZZ'];

  function createData(regions, ...rest) {
    return { regions, ...rest };
  }

  let rows = [];
  if (regionsData && years) {
    rows = Object.entries(regionsData).map((item) => {
      const reg = item[0];

      const temp = years.map((el) => {
        const x = item[1].G[el]?.XX.value === undefined ? '' : item[1].G[el]?.XX.value;
        const y = item[1].G[el]?.YY.value === undefined ? '' : item[1].G[el]?.YY.value;
        const z = item[1].G[el]?.ZZ.value === undefined ? '' : item[1].G[el]?.ZZ.value;

        return [x, y, z];
      });

      const dataRowTemp = temp.reduce((prev, current) => [...prev, ...current], []);

      return createData(reg, ...dataRowTemp);
    });
  }

  const handleOpenPopup = (item) => () => {
    if (item[1]) {
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
              <TableCell align='center' colSpan={3} key={year}>
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
              {Object.entries(row).map((item, index) => {
                if (item[0] === 'regions') return null;
                return (
                  <TableCell
                    align='center'
                    key={`${row.regions}${index}`}
                    onClick={handleOpenPopup(item)}
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
