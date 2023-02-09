import axios from "axios"
import { useEffect, useState } from 'react'

import { Card } from './components/Card'
import { CardsContainer } from "./components/Containers/Cards"
import { HeaderContainer } from "./components/Containers/Header"
import { PageContainer } from "./components/Containers/Page"
import { Input } from './components/Input'
import { RemoveButton } from "./components/RemoveButton"
import { Translated } from "./components/Translated"
import { TranslationContainer } from "./components/Containers/Translation"  
import { Button } from "./components/Button"
import { BrowserSkeleton } from "./components/Skeletons/BrowserSkeleton"
import { CreateContainer } from "./components/Containers/Create"
import { Alert } from "./components/Alert"

import './App.scss'

function App() {
  const [translated, setTranslated] = useState([])
  const [translations, setTranslations] = useState<any>()
  const [inputValue, setInputValue] = useState('')

  const [isUpdate, setIsUpdate] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isDuplicate, setIsDuplicate] = useState(false)

  const [verifyConfirm, setVerifyConfirm ] = useState(true)

  let selecteds : string[] = []

  const apiKey = 'fb95d65ab5mshbe4139f9ab76d8bp1784bajsnd8425d215d3c'

  useEffect(() => {
    setTranslations(getAllStorage())
    setIsUpdate(false)
    return
  }, [isUpdate])

  async function translateIt(text: string) {
    setIsLoading(false)
    setIsDuplicate(false)

    const textAlreadyTranslated = translations.map((i: any) => i.text).includes(inputValue)

    if (textAlreadyTranslated) setIsDuplicate(true)

    if (inputValue.length < 3) return

    const options = {
      method: 'GET',
      url: 'https://translated-mymemory---translation-memory.p.rapidapi.com/get',
      params: { langpair: 'en-GB|pt-BR', q: text, mt: '1', onlyprivate: '0', de: 'a@b.c' },
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'translated-mymemory---translation-memory.p.rapidapi.com'
      }
    }

    const resBody = await axios.request(options)
    setTranslated(resBody.data.matches)
    setIsLoading(true)
    return
  }

  function getAllStorage() {
    let values = []
    let keys = Object.keys(localStorage)
    let i = keys.length;

    while ( i-- ) {
      values.push(JSON.parse(localStorage.getItem(keys[i]) || ''));
    }

    setIsUpdate(true)
    setIsLoading(true)

    return values;
  }

  function createStorage () {
    setIsLoading(true)

    setIsUpdate(true)
    setVerifyConfirm(true)
    localStorage.setItem(inputValue, JSON.stringify({
      text: inputValue,
      translations: selecteds
    }))
    return
  }

  return (
    <PageContainer>
      <HeaderContainer>
        <Input onChange={setInputValue} />
        <Button onClick={() =>  {
          setVerifyConfirm(false)
          translateIt(inputValue)
        }}>Traduzir</Button>
      </HeaderContainer>
      {
        !verifyConfirm
          ?
            !isLoading
              ?
              <CreateContainer>
                <BrowserSkeleton />
              </CreateContainer>
              :
                <CreateContainer>
                  {
                    isDuplicate
                    ?
                      <>
                        <Alert>Já existe uma tradução escolhida, tem certeza que deseja sobrescrever-la ?</Alert>
                        <br />
                        <Button onClick={() => setIsDuplicate(false)}>Sim, tenho certeza</Button>
                      </>
                    :
                      <>
                        <h1>Selecione a tradução escolhida</h1>
                        <CardsContainer>
                          {
                            translated.map((i: any) => (
                              <Card translation={i.translation} key={i.id} seleteds={selecteds} />
                              ))
                            }
                        </CardsContainer>
                        <Button onClick={createStorage}>Confirmar</Button>
                      </>
                  }
                </CreateContainer>
          :
            ''
      }
      <CardsContainer isSavedCards>
        {
          translations?.map((i: any, key: any) => (
            <TranslationContainer key={key}>
              <RemoveButton onClick={() => {
                localStorage.removeItem(i.text)
                setIsUpdate(true)
              }}/>
              <Translated translated={i} />
            </TranslationContainer>
          ))
        }
      </CardsContainer>
    </PageContainer>
  )
}

export default App
