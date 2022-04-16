import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { getCommentsData } from '../../store/actions';
import { commentsData } from '../../assets/comments';
import { getCurrentDate } from '../../helpers/helpers';
import { addComment } from '../../store/actions';

const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: '60px 0',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  table: {
    minWidth: 400,
    maxWidth: 600
  },
  button: {
    width: 140,
    height: 70
  }
});

const UsersTable = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommentsData(commentsData));
  }, [dispatch]);

  const [currentUser, setCurrentUser] = useState('');
  const [value, setValue] = useState('');
  const [comment, setComment] = useState('');
  const [date] = useState(getCurrentDate());

  const { comments } = useSelector((store) => store);

  const users = [];
  comments.forEach((item) => {
    if (users.includes(item.user)) return;
    users.push(item.user);
  });

  function createData(id, value, user, date, comment) {
    return { id, value, user, date, comment };
  }

  const rows = comments.map((user) =>
    createData(user.id, user.value, user.user, user.date, user.comment)
  );
  const headings = ['value', 'user', 'date', 'comment'];

  const handleUser = (event) => {
    setCurrentUser(event.target.value);
  };

  const handleValue = ({ target }) => setValue(target.value.replace(/[^\d]/g, ''));

  const handleComment = ({ target }) => setComment(target.value);

  const closeWindow = () => window.close();

  const handleNewComment = () => {
    const newUser = currentUser || 'Anonymous';
    const newValue = value || '0';
    const newText = comment || 'empty comment';
    const id = uuidv4();

    const newComment = {
      id,
      value: newValue,
      user: newUser,
      date,
      comment: newText
    };

    dispatch(addComment(newComment));

    setComment('');
    setCurrentUser('');
    setValue('');
  };

  console.log('comments', comments);

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label='users comments table'>
        <TableHead>
          <TableRow>
            {headings.map((heading) => (
              <TableCell key={heading} align='center'>
                {heading}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              {Object.entries(row).map((value) => {
                if (value[0] === 'id') return null;
                return (
                  <TableCell key={`${row.id}${value[1]}`} component='td' align='center'>
                    {value[1]}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
          <TableRow>
            <TableCell>
              <TextField label='Value' variant='outlined' value={value} onChange={handleValue} />
            </TableCell>
            <TableCell>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>User</InputLabel>
                <Select sx={{ width: 120 }} value={currentUser} label='User' onChange={handleUser}>
                  {users.map((user) => (
                    <MenuItem value={user} key={user}>
                      {user}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </TableCell>
            <TableCell>{date}</TableCell>
            <TableCell>
              <TextField
                label='Comment'
                variant='outlined'
                value={comment}
                onChange={handleComment}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Button
        className={classes.button}
        variant='contained'
        color='primary'
        onClick={handleNewComment}>
        ADD
      </Button>
      <Button
        size='large'
        className={classes.button}
        variant='contained'
        color='error'
        onClick={closeWindow}>
        CLOSE
      </Button>
    </Paper>
  );
};

export default UsersTable;
