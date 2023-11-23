
const pallete = [
  {   // main green
      text: '#FFFFFF', 
      bgColor: opacity=> `rgba(168, 188, 58, ${opacity})`
  },
  {   // sub orange
      text: '#777777', 
      bgColor: opacity=> `rgba(242, 201, 76, ${opacity})`,
  },
  {   // purple
      text: '#7c3aed', 
      bgColor: opacity=> `rgba(167, 139, 250, ${opacity})`,
  }
]

export const themeColors = {
  ...pallete[0]
}

// Green (#A8BC3A)
// Orange (#F2C94C)