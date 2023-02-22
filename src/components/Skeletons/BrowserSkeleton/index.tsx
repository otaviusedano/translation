import ContentLoader from "react-content-loader"

export function BrowserSkeleton() {
  return (
    <ContentLoader
      speed={2}
      width={500}
      height={214}
      viewBox="0 0 500 214"
      backgroundColor="#ffffffde"
      foregroundColor="#fffffffe"
    >
      <rect x="25" y="17" rx="2" ry="2" width="450" height="24" />
      <rect x="5" y="58" rx="8" ry="8" width="155" height="99" />
      <rect x="175" y="58" rx="8" ry="8" width="155" height="99" />
      <rect x="345" y="58" rx="8" ry="8" width="155" height="99" />
      <rect x="183" y="175" rx="9" ry="9" width="135" height="38" />
    </ContentLoader>
  )
}
