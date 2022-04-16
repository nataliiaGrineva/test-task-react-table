export const getCurrentDate = () => {
  const today = new Date();

  const addZero = (numb) => {
    const res = numb.toString().length < 2 ? `0${numb}` : numb;
    return res;
  };

  const day = addZero(today.getDate());
  const month = addZero(1 + today.getMonth());
  const year = today.getFullYear();

  const date = `${day}.${month}.${year}`;

  return date;
};
