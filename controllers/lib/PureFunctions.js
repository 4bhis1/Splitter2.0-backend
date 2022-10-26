let dateN = () => {
  const date = new Date();

  const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

  let dt = "";
  if (date.getDate() <= 9) dt = "0" + date.getDate();
  else dt = date.getDate();

  return dt + "-" + months[date.getMonth()] + "-" + date.getFullYear();
};

exports.getCustomDate = dateN;
