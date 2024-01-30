import React from 'react'
import { BiHide, BiLock, BiLockOpen, BiNote, BiNotepad, BiShowAlt } from 'react-icons/bi'
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'

import Button from '../Button'
import { DistrictrContext, DistrictrDispatchContext } from '../Districtr/DistrictrContext'
import {
  DatasetPicker,
  DatasetPickerWrapper,
  GhostInput,
  InputWrapper,
  PopulationLabel,
  PopulationValue,
  PopulationWrapper,
  UnitColor,
  UnitControllerWrapper,
  UnitDetails,
  UnitHeader,
  UnitInformation,
  UnitNotePad,
  UnitNotePadWrapper,
  UnitOptionsRow,
  UnitPagerTitle
} from './UnitController.styles'
import { UnitControllerProps } from './UnitController.types'

const UnitController: React.FC<UnitControllerProps> = ({ dataSets, activeDataSet, setActiveDataSet }) => {
  const districtr = React.useContext(DistrictrContext)
  const districtrDispatch = React.useContext(DistrictrDispatchContext)
  const [showNotes, setShowNotes] = React.useState(false)

  const handleActiveDatasetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    districtrDispatch({ type: 'change_active_dataset', payload: e.target.value })
  }

  const changeActiveUnit = (unitId: string | number) => {
    districtrDispatch({ type: 'set_active_unit', payload: unitId })
  }

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    districtrDispatch({ type: 'update_unit_name', payload: { unit: districtr.activeUnit, name: e.target.value } })
  }

  const getPopulationVariance = () => {
    if (
      districtr.units[districtr.activeUnit].population / districtr.units[districtr.activeUnit].unitIdealPopulation >
      1
    ) {
      return `+${(
        districtr.units[districtr.activeUnit].population - districtr.units[districtr.activeUnit].unitIdealPopulation
      ).toLocaleString()}`
    } else if (
      districtr.units[districtr.activeUnit].population / districtr.units[districtr.activeUnit].unitIdealPopulation <
      1
    ) {
      return `${(
        districtr.units[districtr.activeUnit].population - districtr.units[districtr.activeUnit].unitIdealPopulation
      ).toLocaleString()}`
    } else {
      return `0`
    }
  }

  const handleUnitLockChange = () => {
    districtrDispatch({ type: 'toggle_unit_lock', payload: { unit: districtr.activeUnit } })
  }

  const handleUnitVisibilityChange = () => {
    districtrDispatch({ type: 'toggle_unit_visibility', payload: { unit: districtr.activeUnit } })
  }

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    districtrDispatch({ type: 'update_unit_note', payload: { unit: districtr.activeUnit, note: e.target.value } })
  }

  return (
    <UnitControllerWrapper data-testid="UnitController">
      <UnitHeader>
        <Button variant="toolbar" onClick={() => changeActiveUnit('previous')} style={{ border: 'none' }}>
          <FaArrowCircleLeft />
        </Button>
        <div>
          <UnitPagerTitle>
            {districtr.activeUnit} of {Object.keys(districtr.units).length}
          </UnitPagerTitle>
        </div>
        <Button variant="toolbar" onClick={() => changeActiveUnit('next')} style={{ border: 'none' }}>
          <FaArrowCircleRight />
        </Button>
      </UnitHeader>
      <UnitInformation>
        <UnitColor style={{ backgroundColor: districtr.units[districtr.activeUnit].color }}></UnitColor>
        <UnitDetails>
          <InputWrapper>
            <GhostInput
              type="text"
              value={districtr.units[districtr.activeUnit].name}
              onChange={(e) => {
                handleTextInputChange(e)
              }}
            />
          </InputWrapper>

          <UnitOptionsRow>
            <Button
              pressed={districtr.lockedUnits.has(districtr.activeUnit)}
              size="small"
              variant="toolbar"
              onClick={handleUnitLockChange}
              style={{ marginRight: 4 }}
            >
              {districtr.lockedUnits.has(districtr.activeUnit) ? <BiLock /> : <BiLockOpen />}
            </Button>
            <Button
              pressed={districtr.hiddenUnits.has(districtr.activeUnit)}
              size="small"
              variant="toolbar"
              onClick={handleUnitVisibilityChange}
              style={{ marginRight: 4 }}
            >
              {districtr.hiddenUnits.has(districtr.activeUnit) ? <BiHide /> : <BiShowAlt />}
            </Button>
            <Button
              pressed={showNotes}
              size="small"
              variant="toolbar"
              onClick={() => setShowNotes(!showNotes)}
              style={{ marginRight: 4 }}
            >
              <BiNote />
            </Button>

            <DatasetPickerWrapper>
              <DatasetPicker onChange={(e) => setActiveDataSet(e.target.value)}>
                {dataSets.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </DatasetPicker>
            </DatasetPickerWrapper>
          </UnitOptionsRow>
        </UnitDetails>
      </UnitInformation>

      {showNotes && (
        <UnitNotePadWrapper>
          <label htmlFor="notes">Unit Notes</label>
          <UnitNotePad
            name="notes"
            value={districtr.units[districtr.activeUnit].note}
            onChange={(e) => handleNoteChange(e)}
          ></UnitNotePad>
        </UnitNotePadWrapper>
      )}

      <PopulationWrapper>
        <div>
          <PopulationLabel>Population</PopulationLabel>
          <PopulationValue>{districtr.units[districtr.activeUnit].population.toLocaleString()}</PopulationValue>
        </div>
        <div>
          <PopulationLabel>+/- Ideal</PopulationLabel>
          <PopulationValue>{getPopulationVariance()}</PopulationValue>
        </div>

        <div>
          <PopulationLabel>Ideal</PopulationLabel>
          <PopulationValue>
            {districtr.units[districtr.activeUnit].unitIdealPopulation.toLocaleString()}
          </PopulationValue>
        </div>
      </PopulationWrapper>
    </UnitControllerWrapper>
  )
}

export default UnitController
