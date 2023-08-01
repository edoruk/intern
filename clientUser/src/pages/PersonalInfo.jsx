import { useState } from "react"
import {
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material/"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"

function PersonalInfo({ formData, setFormData }) {
  const [isValid, setIsValid] = useState(true)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  return (
    <div className="flex flex-col h-full justify-center items-center gap-12">
      <h1 className=" text-[30px] text-center">Personal Information</h1>
      <TextField
        id="outlined-basic"
        className="w-full"
        label="Name"
        variant="outlined"
        value={formData.name}
        onChange={(event) =>
          setFormData({ ...formData, name: event.target.value })
        }
      />
      <TextField
        id="outlined-basic"
        className="w-full"
        label="Surname"
        variant="outlined"
        value={formData.surname}
        onChange={(event) =>
          setFormData({ ...formData, surname: event.target.value })
        }
      />
      <TextField
        id="outlined-basic"
        className="w-full"
        label="Email"
        variant="outlined"
        type={"email"}
        value={formData.email}
        required
        error={!isValid}
        helperText={!isValid ? "Invalid email format" : ""}
        onChange={(event) => {
          const isEmailValid = emailPattern.test(event.target.value)
          setIsValid(isEmailValid)
          setFormData({ ...formData, email: event.target.value })
        }}
      />
      <DatePicker
        className="w-full"
        value={formData.dateOfBirth}
        slotProps={{
          textField: {
            error: false,
          },
        }}
        label="Date of Birth"
        format="DD/MM/YYYY"
        onChange={(date) => {
          const formattedDate = `${date.$D}/${date.$M + 1}/${date.$y}`
          setFormData({ ...formData, dateOfBirth: formattedDate })
        }}
      />

      <TextField
        id="outlined-multiline-flexible"
        label="Address"
        multiline
        maxRows={4}
        className="w-full"
        value={formData.address}
        onChange={(event) =>
          setFormData({ ...formData, address: event.target.value })
        }
      />

      <FormControl className="w-full items-center">
        <FormLabel>Gender</FormLabel>
        <RadioGroup
          value={formData.gender}
          className="flex flex-col"
          onChange={(event) =>
            setFormData({ ...formData, gender: event.target.value })
          }
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
        </RadioGroup>
      </FormControl>
    </div>
  )
}

export default PersonalInfo
