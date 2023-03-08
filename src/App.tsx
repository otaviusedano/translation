import { useEffect, useState } from "react"

import { createClient } from "pexels"

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
import { Image } from "./components/Image"
import { ImagesContainer } from "./components/Containers/Images"
import { SelectPage } from "./components/SelectPage"

import { ITranslations } from "./interfaces/translations"
import { IImages } from "./interfaces/images"

import "./App.scss"
import "lazysizes"

function App() {
  const [images, setImages] = useState([])
  const [countPage, setCountPage] = useState(1)
  const [translations, setTranslations] = useState<ITranslations[]>([])
  const [inputValue, setInputValue] = useState("")

  const [isUpdate, setIsUpdate] = useState(false)
  const [isDuplicate, setIsDuplicate] = useState(false)
  const [isTranslated, setIsTranslated] = useState(false)

  const [verifyConfirm, setVerifyConfirm] = useState(true)

  const client = createClient(
    "nORoYnyGEZ0IELxMq3sgOwei1go1s5LuRufZ8Q7lU9jDAtZLr6YWdPVo"
  )

  let selecteds: string[] = []

  useEffect(() => {
    setTranslations(getAllStorage())
    setIsUpdate(false)
    return
  }, [isUpdate])

  function getPhotos() {
    client.photos
      .search({
        query: inputValue,
        locale: "en-US",
        page: countPage,
        per_page: 8,
      })
      .then((i: any) => {
        setImages(i.photos)
      })
    return
  }

  async function translateIt() {
    setIsDuplicate(false)
    setImages([])

    const textAlreadyTranslated = translations
      .map((i: ITranslations) => i.text)
      .includes(inputValue)

    if (textAlreadyTranslated) setIsDuplicate(true)

    if (inputValue.length < 3) return

    getPhotos()
    setIsTranslated(true)
    return
  }

  useEffect(() => {
    if (isTranslated) getPhotos()

    return
  }, [countPage])

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
    if (!selecteds.length) return alert("Nenhuma Imagem selecionada!")

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

  function handleNextPage() {
    setCountPage(countPage + 1)

    return
  }

  function handlePrevPage() {
    if (countPage === 1) return
    setCountPage(countPage - 1)

    return
  }

  return (
    <PageContainer>
      <HeaderContainer>
        <Input onChange={setInputValue} setCountPage={setCountPage} />
        <Button
          onClick={() => {
            setVerifyConfirm(false)
            translateIt()
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
              <Button onClick={() => setIsDuplicate(false)}>
                Sim, tenho certeza
              </Button>
            </>
          ) : (
            <>
              <h1>Selecione a imagem para tradução escolhida</h1>
              <ImagesContainer>
                {images?.map((image: IImages, index) => (
                  <Image
                    key={index}
                    src={image.src.original}
                    selecteds={selecteds}
                    alt={image.alt}
                  />
                ))}
              </ImagesContainer>
              <SelectPage onClick={handlePrevPage} />
              <Button onClick={createStorage}>Confirmar</Button>
              <SelectPage isNextPage onClick={handleNextPage} />
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
