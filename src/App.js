import './App.css';
import { Button, ThemeProvider, createTheme, Select, MenuItem, Box } from '@mui/material'
import { red, green, blue } from '@mui/material/colors'
import { useSelector, useDispatch } from 'react-redux';
import { update } from './slices/themeSlice'
import { useEffect, useState } from 'react';

const buttonStyles = {
  margin: '0 10px'
}

function App() {

  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.color);

  const getColor = () => {
    if (theme === 1) {
      return green[500]
    } else if (theme === 2) {
      return blue[500]
    } else {
      return red[500]
    }
  }

  const handleThemeChange = createTheme({
    palette: {
      primary: {
        main: getColor()
      }
    }
  })

  const handleChange = (event) => {
    setIsLoading(true)
    fetch('http://localhost:5000/theme', {
      method: "PATCH",
      body: JSON.stringify({theme: event.target.value}),
      headers:  {
        'Content-Type': 'application/json'
      }
    })
    .then(() => {
      dispatch(update({ color: event.target.value }))
      setIsLoading(false)
    })
    .catch(() => {
      setIsLoading(false)
    })
  }

  const getTheme = () => {
    fetch('http://localhost:5000/theme')
      .then(r => r.json())
      .then(result => {
        dispatch(update(result.data[0].theme))
        setIsLoading(false)
      })
      .catch(console.log)
  }

  useEffect(() => {
    getTheme()
  }, [])

  return <>{
    !isLoading && (
      <ThemeProvider theme={handleThemeChange}>
        <div className="App">
          <div>
            <Box component='span' htmlFor='change-theme'
              id='change-theme-label'
              sx={{
                fontSize: '1.5em',
                paddingRight: '10px'
              }}>
              Change Theme:
            </Box>
            <Select
              labelId="change-theme"
              id="change-theme"
              label="Change Theme"
              onChange={handleChange}
              value={theme}
            >
              <MenuItem value={0}>Red</MenuItem>
              <MenuItem value={1}>Green</MenuItem>
              <MenuItem value={2}>Blue</MenuItem>
            </Select>
          </div>

          <Main />
        </div>
      </ThemeProvider>
    )
  }</>
}

export default App;

function Main() {
  return <Box sx={{ marginTop: '1em' }}>
    <Button sx={buttonStyles} variant='contained'>
      Button 1
    </Button>
    <Button sx={buttonStyles} variant='outlined'>
      Button 2
    </Button>
    <Button sx={buttonStyles} variant='text'>
      Button 3
    </Button>
  </Box>
}