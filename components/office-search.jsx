import React, { useState } from 'react'
import styles from '../styles/OfficeSearch.module.scss'

import { Select } from 'antd'
import { regions } from '../accessories/regions';
import { useDispatch } from 'react-redux';
import { updateHiringChoice } from '../redux/actions';
const { Option } = Select;

function OfficeSearch({hiringChoiceNumber}) {

    const dispatch = useDispatch() 

    const [selectedRegion, setSelectedRegion] = useState(null)
    const [isSubmited, setIsSubmited] = useState(false)
    const [clickedOfficeId, setClickedOfficeId] = useState(null)

    function change(value){
        console.log(value)
        const region = regions.find(region=>region.title===value)
        setSelectedRegion(region)
        setClickedOfficeId(null)
        setIsSubmited(false)
        dispatch(updateHiringChoice({number: hiringChoiceNumber, prop: "choice", value: '' }))

    }

    function submit(e){
        e.preventDefault()
        setIsSubmited(true)
    }

    function officeClicked(e){
        const id = e.target.dataset.id
        if(!id)
            return
        setClickedOfficeId(id)
        const city = selectedRegion.cities.find(city=>city.id===id) 
        const value = `${city.title} / ${city.street}`
        dispatch(updateHiringChoice({number: hiringChoiceNumber, prop: "choice", value }))
        dispatch(updateHiringChoice({number: hiringChoiceNumber, prop: "id", value: city.id}))
    }

    return (
        <div className={styles.officeSearch}>
            <div className={styles.officeSearchTitle}>
                2. WYBIERZ PROFESJONALNY ADRES <span className={styles.boldFont}>SWOJEJ FIRMY</span> 
            </div>
            <div className={styles.officeSearchDescription}>
                Wpisz nazwę lub kod pocztowy miasta, w którym chcesz wybrać adres firmy. Dostępne adresy i miesięczny koszt wyświetlą się poniżej.
            </div>
            <div className={styles.officeSearchInputWrapper}>
                <div className={styles.officeSearchInput}>
                    <Select
                        showSearch
                        style={{
                            width: '436px',
                        }}
                        placeholder="Wpisz Województwo"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                        onChange={change}
                    >
                        {regions.map(region=>{
                            return (
                                <Option key={region.title} value={region.title}>{region.title}</Option>
                            )
                        })}
                    </Select>
                </div> 
                <button className={styles.officeSearchButton} onClick={submit}>WYSZUKAJ</button>
            </div>
            
            <div className={styles.officeSearchResult} onClick={officeClicked}>
                {selectedRegion && isSubmited && selectedRegion.cities.map(city=>(
                    <div 
                        className={ clickedOfficeId===city.id? styles.clickedOfficeSearchItem: styles.officeSearchItem} 
                        data-id={city.id} 
                        key={city.id}
                    >
                        {`${city.title}. ${city.street}`}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OfficeSearch
