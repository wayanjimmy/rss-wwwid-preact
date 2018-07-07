import styled from 'preact-emotion'

const HeaderClass = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const BodyClass = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CardClass = styled('div')`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  padding: 20px;
  margin: 20px 20px;
  border-radius: 10px;
`

export function Header({title, children}) {
  return (
    <HeaderClass>
      <h3>{title}</h3>
      {children}
    </HeaderClass>
  )
}

export function Body({children}) {
  return <BodyClass>{children}</BodyClass>
}

export function Footer({children}) {
  return <div>{children}</div>
}

export function Card({children}) {
  return <CardClass>{children}</CardClass>
}

export default Card
