const FullHeightPage = () => (
    <div>
      Hello World!
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div {
          height: 100%;
        }
      `}</style>
    </div>
  )

  export default FullHeightPage