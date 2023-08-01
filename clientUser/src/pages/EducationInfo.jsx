import {
  TextField,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
} from "@mui/material"
import { DatePicker } from "antd"

function EducationInfo({ formData, setFormData }) {
  const tools = ["tool1", "tool2", "tool3", "tool4"]
  const years = [
    {
      value: 1,
      label: "1. Sınıf",
    },
    {
      value: 2,
      label: "2. Sınıf",
    },
    {
      value: 3,
      label: "3. Sınıf",
    },
    {
      value: 4,
      label: "4. Sınıf",
    },
    {
      value: 0,
      label: "Mezun",
    },
  ]

  return (
    <div className="flex flex-col h-full justify-center items-center gap-12">
      <h1 className="text-[30px] text-center">Education Information</h1>
      <TextField
        id="outlined-basic"
        className="w-full"
        label="School"
        variant="outlined"
        value={formData.school}
        onChange={(event) =>
          setFormData({ ...formData, school: event.target.value })
        }
      />
      <TextField
        id="outlined-basic"
        className="w-full"
        label="Major"
        variant="outlined"
        value={formData.major}
        onChange={(event) =>
          setFormData({ ...formData, major: event.target.value })
        }
      />
      <TextField
        id="outlined-select-currency"
        className="w-full"
        select
        label="Year"
        defaultValue="1"
        onChange={(event) => {
          setFormData({ ...formData, year: event.target.value })
        }}
      >
        {years.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <FormControl className="w-full">
        <InputLabel id="demo-multiple-checkbox-label">
          Software Tools
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={formData.softwareTools}
          onChange={(event) =>
            setFormData({ ...formData, softwareTools: event.target.value })
          }
          input={<OutlinedInput label="Software Tools" />}
          renderValue={(selected) => selected.join(", ")}
        >
          {tools.map((tool) => (
            <MenuItem key={tool} value={tool}>
              <Checkbox checked={formData.softwareTools.indexOf(tool) > -1} />
              <ListItemText primary={tool} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div className="w-full flex justify-center">
        <label htmlFor="rangePicker" className="text-left">
          Date of Training
        </label>
        <DatePicker.RangePicker
          placeholder={["Start", "End"]}
          picker="date"
          format="DD/MM/YYYY"
          className="w-full ant-picker-panels"
          onChange={(date) => {
            const formattedDate = `${date[0].$D}/${date[0].$M + 1}/${
              date[0].$y
            } - ${date[1].$D}/${date[1].$M + 1}/${date[1].$y}`
            console.log(formattedDate)
            setFormData({ ...formData, trainingDates: formattedDate })
          }}
        />
      </div>
    </div>
  )
}

export default EducationInfo
