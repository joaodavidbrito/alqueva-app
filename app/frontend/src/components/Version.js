import React, {useContext} from 'react'
import AlquevaAppContext from '../context/AlquevaAppContext'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import moment from 'moment'

const Version = () => {
    const { version } = useContext(AlquevaAppContext)
    return (
        <div>
            {
            version ? (
                <Row>
                    <Col>
                        <p>Copyright {moment().format('YYYY')} &copy; João David Brito. Todos os direitos reservados - {version}</p>
                    </Col>
                </Row>
            ) : ''
        }
        </div>
    )
}

export {Version as default}