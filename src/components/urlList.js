import React from "react";
import { ListGroup} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy,faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";

const UrlList = ({data, handleDelete}) => {


    
    return (
        <ListGroup>
            {data.map((url,i) => (
                    <ListGroup.Item key={i} style={{textAlign:'left'}} className="d-flex  border-info justify-content-between align-items-center" >
                        <p className="m-0">{url.short} <small className="me-5 fst-italic text-break text-secondary">({url.original})</small></p>
                        <span>
                        <CopyToClipboard text={url.short}>
                            <FontAwesomeIcon cursor="pointer" className="fs-3 mx-2 icon-btn"  icon={faCopy}/>
                        </CopyToClipboard>
                        <FontAwesomeIcon cursor="pointer" className="fs-3 mx-2 icon-btn" icon={faTrashCan} onClick={() => handleDelete(url.short)}/>
                        </span>
                    </ListGroup.Item>
            ))} 
        </ListGroup>
    )
}

export default UrlList