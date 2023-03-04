import axios from "axios"
import { useEffect, useState } from "react"

import { CardsContainer } from "./components/Containers/Cards"
import { HeaderContainer } from "./components/Containers/Header"
import { PageContainer } from "./components/Containers/Page"
import { Input } from "./components/Input"
import { RemoveButton } from "./components/RemoveButton"
import { Translated } from "./components/Translated"
import { TranslationContainer } from "./components/Containers/Translation"
import { Button } from "./components/Button"
import { CreateContainer } from "./components/Containers/Create"
import { Alert } from "./components/Alert"
import { ITranslations } from "./interfaces/translations"
import { Image } from "./components/Image"
import { ImagesContainer } from "./components/Containers/Images"

import "./App.scss"

function App() {
  const [images, setImages] = useState([])
  const [translations, setTranslations] = useState<ITranslations[]>([])
  const [inputValue, setInputValue] = useState("")

  const [isUpdate, setIsUpdate] = useState(false)
  const [isDuplicate, setIsDuplicate] = useState(false)

  const [verifyConfirm, setVerifyConfirm] = useState(true)

  let selecteds: string[] = []

  // const apiKey = "fb95d65ab5mshbe4139f9ab76d8bp1784bajsnd8425d215d3c"

  const apiKey = "1zCqjbsKmTti76DaKJodDzBmW_CjTG_3HLD0M3Jj1dw"

  useEffect(() => {
    setTranslations(getAllStorage())
    setIsUpdate(false)
    return
  }, [isUpdate])

  async function translateIt(text: string) {
    setIsDuplicate(false)
    setImages([])

    const textAlreadyTranslated = translations
      .map((i: ITranslations) => i.text)
      .includes(inputValue)

    if (textAlreadyTranslated) setIsDuplicate(true)

    if (inputValue.length < 3) return

    // const options = {
    //   method: "GET",
    //   url: "https://translated-mymemory---translation-memory.p.rapidapi.com/get",
    //   params: {
    //     langpair: "en-GB|pt-BR",
    //     q: text,
    //     mt: "1",
    //     onlyprivate: "0",
    //     de: "a@b.c",
    //   },
    //   headers: {
    //     "X-RapidAPI-Key": apiKey,
    //     "X-RapidAPI-Host":
    //       "translated-mymemory---translation-memory.p.rapidapi.com",
    //   },
    // }

    const options = {
      method: "GET",
      url: "https://api.unsplash.com/search/photos",
      params: {
        query: text,
        page: "1",
        per_page: "20",
        client_id: apiKey,
      },
    }

    const resBody = await axios.request(options)
    console.log(resBody.headers["x-ratelimit-remaining"])

    setImages(resBody.data.results)
    return
  }

  function getAllStorage() {
    let values = []
    let keys = Object.keys(localStorage)
    let i = keys.length

    while (i--) {
      values.push(JSON.parse(localStorage.getItem(keys[i]) || ""))
    }

    setIsUpdate(true)

    return values
  }

  function createStorage() {
    console.log(selecteds)

    setIsUpdate(true)
    setVerifyConfirm(true)
    localStorage.setItem(
      inputValue,
      JSON.stringify({
        text: inputValue,
        images: selecteds,
      })
    )
    return
  }

  return (
    <PageContainer>
      <HeaderContainer>
        <Input onChange={setInputValue} />
        <Button
          onClick={() => {
            setVerifyConfirm(false)
            translateIt(inputValue)
          }}
        >
          Traduzir
        </Button>
      </HeaderContainer>
      {!verifyConfirm ? (
        <CreateContainer>
          {isDuplicate ? (
            <>
              <Alert>
                Já existe uma tradução escolhida, tem certeza que deseja
                sobrescrever-la ?
              </Alert>
              <br />
              <Button onClick={() => setIsDuplicate(false)}>
                Sim, tenho certeza
              </Button>
            </>
          ) : (
            <>
              <h1>Selecione a imagem para tradução escolhida</h1>
              <ImagesContainer>
                {images.map((image: any, index) => (
                  <Image
                    key={index}
                    src={image.urls.regular}
                    selecteds={selecteds}
                  />
                ))}
              </ImagesContainer>
              <Button onClick={createStorage}>Confirmar</Button>
            </>
          )}
        </CreateContainer>
      ) : (
        ""
      )}
      <CardsContainer>
        {translations?.map((i: ITranslations, key) => (
          <TranslationContainer key={key}>
            <RemoveButton
              onClick={() => {
                localStorage.removeItem(i.text)
                setIsUpdate(true)
              }}
            />
            <Translated selecteds={i} />
          </TranslationContainer>
        ))}
      </CardsContainer>
    </PageContainer>
  )
}

export default App
