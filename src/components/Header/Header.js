import React from 'react'
import styled from 'styled-components'

const Nav = styled.nav`
    position: fixed;
`

export default function Header() {
    return (
        <Nav>
            <span>This is the navbar</span>
        </Nav>
    )
}