export function generateGraphPaths(dataPoints, width = 100, height = 40) {
  if (!dataPoints || dataPoints.length < 2) {
    return { linePath: '', areaPath: '' }
  }

  // Знаходимо мінімум і максимум для правильного масштабування (як у реальних спарклайнах)
  const minAmount = Math.min(...dataPoints)
  const maxAmount = Math.max(...dataPoints, 1)
  const range = maxAmount - minAmount || 1

  // Залишаємо по 2 пікселі зверху та знизу, щоб strokeWidth="2" не обрізався
  const paddingY = 2
  const usableHeight = height - paddingY * 2

  let linePath = ''

  dataPoints.forEach((point, index) => {
    // Рівномірно розподіляємо по осі X
    const x = (index / (dataPoints.length - 1)) * width

    // Нормалізуємо значення від 0 до 1 і переводимо в координату Y
    const normalized = (point - minAmount) / range
    const y = paddingY + (usableHeight - normalized * usableHeight)

    if (index === 0) {
      linePath += `M ${x},${y} `
    } else {
      const prevX = ((index - 1) / (dataPoints.length - 1)) * width
      const prevNormalized = (dataPoints[index - 1] - minAmount) / range
      const prevY = paddingY + (usableHeight - prevNormalized * usableHeight)

      // Контрольні точки для плавного вигину (Bezier curve)
      const cp1x = prevX + (x - prevX) / 2
      const cp1y = prevY
      const cp2x = prevX + (x - prevX) / 2
      const cp2y = y

      linePath += `C ${cp1x},${cp1y} ${cp2x},${cp2y} ${x},${y} `
    }
  })

  // Замикаємо контур для заливки знизу
  const areaPath = `${linePath} L ${width},${height} L 0,${height} Z`

  return { linePath, areaPath }
}
