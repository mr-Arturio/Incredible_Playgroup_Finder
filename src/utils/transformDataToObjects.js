

export function transformDataToObjects(data) {
  const headers = data[0];
  return data.slice(1).map(row => {
    return headers.reduce((accumulator, header, index) => {
      accumulator[header] = row[index];
      return accumulator;
    }, {});
  });
}