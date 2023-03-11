import { useCallback, useEffect, useState } from "react"

import { createClient } from "pexels"

import { CardsContainer } from "./components/Containers/Cards"
import { HeaderContainer } from "./components/Containers/Header"
import { PageContainer } from "./components/Containers/Page"
import { Input } from "./components/Input"
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
  const [images, setImages] = useState<any[]>([])

  const [countPage, setCountPage] = useState(1)
  const [translations, setTranslations] = useState<any[]>([])

  const [newTranslation, setNewTranslation] = useState("")

  const [isDuplicate, setIsDuplicate] = useState(false)
  const [verifyConfirm, setVerifyConfirm] = useState(true)

  const client = createClient(
    "nORoYnyGEZ0IELxMq3sgOwei1go1s5LuRufZ8Q7lU9jDAtZLr6YWdPVo"
  )

  const textAlreadyTranslated = translations
    .map((i: ITranslations) => i?.text)
    .includes(newTranslation)

  let selecteds: string[] = []

  useEffect(() => {
    if (!getAllStorage().length) return

    setTranslations(getAllStorage())
  }, [])

  function getPhotos() {
    const countPerPage = 8

    client.photos
      .search({
        query: newTranslation,
        locale: "en-US",
        page: countPage,
        per_page: countPerPage,
      })
      .then((i: any) => {
        setImages([...i.photos])
      })
    return
  }

  async function translateIt() {
    setIsDuplicate(false)
    if (newTranslation.length < 3) return

    if (textAlreadyTranslated) setIsDuplicate(true)

    getPhotos()
    return
  }

  function getAllStorage() {
    let values = []
    let keys = Object.keys(localStorage)
    let i = keys.length

    while (i--) {
      values.push(JSON.parse(localStorage.getItem(keys[i]) || ""))
    }

    return values
  }

  function compareTranslations(translations: any) {
    const translationsFiltereds = translations.map(
      (translations: ITranslations) => {
        if (translations?.text === newTranslation) {
          const imagesLength = translations.images.length

          translations.images.splice(0, imagesLength)
          translations.images.push(...selecteds)
        }
      }
    )

    return translationsFiltereds
  }

  function handleCreateTranslation() {
    if (!selecteds.length) return alert("Nenhuma Imagem selecionada!")
    setTranslations((translations) => {
      if (textAlreadyTranslated)
        return [...translations, ...compareTranslations(translations)]
      return [
        ...translations,
        {
          text: newTranslation,
          images: selecteds,
        },
      ]
    })

    createStorage()
  }

  function createStorage() {
    setVerifyConfirm(true)
    localStorage.setItem(
      newTranslation,
      JSON.stringify({
        text: newTranslation,
        images: selecteds,
      })
    )
    return
  }

  useEffect(() => {
    getPhotos()
  }, [countPage])

  function handleRemoveTranslation(translationFromEvent: any) {
    setTranslations((translations) => {
      translations.map((translation) => {
        if (translationFromEvent === translation) {
          localStorage.removeItem(translation.text)
          translation.images.splice(0, translation.images.length)
          translation.text = ""
        }
      })

      return [...translations]
    })

    return translationFromEvent
  }

  const ImagesContainerComponent = (
    <>
      <h1>Selecione a imagem para tradução escolhida</h1>
      <ImagesContainer>
        {images?.map((image: IImages, index: number) => (
          <Image
            key={index}
            src={image.src.original}
            selecteds={selecteds}
            alt={image.alt}
          />
        ))}
      </ImagesContainer>
      <SelectPage countPage={countPage} setCountPage={setCountPage} />
      <Button onClick={handleCreateTranslation}>Confirmar</Button>
      <SelectPage
        isNextPage
        countPage={countPage}
        setCountPage={setCountPage}
      />
    </>
  )

  return (
    <PageContainer>
      <HeaderContainer>
        <Input onChange={setNewTranslation} value={newTranslation} />
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
            ImagesContainerComponent
          )}
        </CreateContainer>
      ) : (
        ""
      )}
      <CardsContainer>
        {translations.map((i: ITranslations, key) =>
          i ? (
            <TranslationContainer key={key}>
              <Translated selecteds={i} onClick={handleRemoveTranslation} />
            </TranslationContainer>
          ) : (
            ""
          )
        )}
      </CardsContainer>
    </PageContainer>
  )
}

export default App
