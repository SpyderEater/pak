export default function floatToCurrency(inputNum) {
  let formattedNum = Number.parseFloat(inputNum).toFixed(2)
  return formattedNum === 'NaN' ? null : formattedNum
}
