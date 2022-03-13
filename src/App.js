import React, {useState} from 'react';
import axios from 'axios';
import './App.css';
import MainNav from "./components/nav"
import Footer from './components/footer';
import { Button, Container, Form, Row, Col, Spinner} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faFloppyDisk, faLock } from '@fortawesome/free-solid-svg-icons'
import UrlList from './components/urlList';
import { useEffect } from 'react';
import SignUp from './components/signUp';
import isURL from 'validator/lib/isURL';


function App() {
  const [inputVal,setInputVal] = useState('')
  const [invalid, setInvalid] = useState(false)
  const [loading, setLoading] = useState(false)
  const [urls, setURLs] = useState([])
  const [showModal, setShowModal] = useState(false)

  // WHEN COMPONENT MOUNTS, CHECK LOCAL SOTRAGE FOR PAST SAVED URLS
  useEffect(() => {
    if(localStorage.getItem('short_urls')) {
      setURLs(JSON.parse(localStorage.getItem('short_urls')))
      // console.log(JSON.parse(localStorage.getItem('short_urls')))
    }
  },[])

  console.log(urls)

  // UPDATE LOCAL STORAGE WHENEVER URLS STATE CHANGES
  useEffect(() => {
    localStorage.setItem('short_urls', JSON.stringify(urls))
  }, [urls])

  // THIS WILL ALSO REMOVE FROM LOCAL STORAGE AS USE EFFECT IS LISTENING.
  const removeURL = (url) => {
    setURLs(urls.filter(e => e.short !== url))
  }

  const handleSubmit = (e) => {
    // First check URL is valid 
    e.preventDefault()

    if (!isURL(inputVal)) {
      // Input will listen to this state to render error message. 
      setInvalid(true)
      return
    } else {
      // reset invalid to false if re-submit is valid.
      setInvalid(false)
    }
    // state to control the loading spinner. 
    setLoading(!loading)
    // call API
    shortenLink(inputVal)
  }

  // call API with axios get request.
  // Set loading to false upon response to remove spinner. 
  const shortenLink = (url) => {
    axios.get(`https://api.shrtco.de/v2/shorten?url=${url}`)
      .then(res => {
        setURLs([...urls, {'short': res.data.result.short_link2, 'original': res.data.result.original_link}])
        setLoading(false)
      })
      .catch(err => {
        setInvalid(true)
        setLoading(false)
      })
  }


  return (
    <div className="App bg-light">

     <MainNav showModal={setShowModal}/>

     <Container className='align-items-center my-5 p-5'>
       <h5 className='text-secondary fw-bold fst-italic my-2'><small>THANKS FOR USING SHORTLY</small></h5>
       <h1 className='fw-bolder my-2'>
         Shorten your URL Quickly and Easily.
       </h1>
       <p className='my-2'>Enter your URL below and click go to get your awesomely shortened link, it's that easy!</p>
        <Form className='mt-5'>
          <Row className="justify-content-center">
            <Col className='my-2 ' lg={5} md={6} sm={7}>          
              <Form.Control isInvalid={invalid} onChange={(e) => setInputVal(e.target.value)}  className='py-3' type="text" placeholder="Enter your URL..." />
              <Form.Control.Feedback type='invalid'>
                Please enter a valid URL!
              </Form.Control.Feedback>
            </Col>

            {/* CONDITIONALLY RENDER SPINNER FOR GOOD UX PRACTICE */}
            <Col className='my-2 ' lg={2} md={2} sm={4}>
              { loading ?
                <Spinner size='lg' animation="grow" variant="info" />
              :
                <Button onClick={handleSubmit} type='submit'  variant="info" className='w-100 text-white fw-bolder py-3'>Go!</Button>
              }
            </Col>
            <p className='text-secondary fw-bold my-2'>
              <small>Over 10,000 URLs shortened every month!</small>
            </p>
          </Row>
        </Form>
     </Container>

     <Container className='p-5'>
      <Row>
        <Col md={4}>
          <FontAwesomeIcon className="text-info fs-2" icon={faCoffee} />
          <h3>Easy to Use</h3>
          <p className='text-secondary'>Enter your URL, hit the button, and get your link! It's as easy as that!</p>
        </Col>
        <Col md={4}>
          <FontAwesomeIcon className="text-info fs-2" icon={faFloppyDisk} />
          <h3>Save Your Links</h3>
          <p className='text-secondary'>Get access to all of your shortened links with ease.</p>
        </Col>
        <Col md={4}>
          <FontAwesomeIcon className="text-info fs-2" icon={faLock} />
          <h3>Unlimited Access</h3>
          <p className='text-secondary'>Sign up for a free account to get unlimited shortening privileges!</p>
        </Col>
      </Row>
     </Container>

     <Container className='my-3'>
       <h3>My URLs</h3>
       <Row className='justify-content-center'>
         {/* CONDITIONALLY RENDER URLS IF THEY EXIST */}
         <Col lg={6} md={8}>
           {  urls && urls.length > 0 ?

            <UrlList data={urls} handleDelete={removeURL}/>
            :
            <p className='text-secondary fst-italic'>You currently have no URLs saved.</p>
           }
         </Col>
       </Row>
     </Container>

      <Footer />

      {/* SIGNUP MODAL TOGGLED VIA  show modal state*/}
      <SignUp show={showModal} toggleShow={setShowModal}/>
    </div>
  );
}

export default App;
