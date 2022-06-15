import MapGL, { Marker, Popup } from "react-map-gl";
import maplibregl from "maplibre-gl";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { formatDistance } from "date-fns";
import { Context } from "./GlobleContext";
import UploadImages from "./UploadImages";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);
  const [isShown, setIsShown] = useState(false);
  const [imgLink, setImgLink] = useState(null);
  const navigate = useNavigate();

  const { currentUser } = useContext(Context);

  // to get all the pins from the backend
  useEffect(() => {
    fetch("/api/getPins")
      .then((res) => res.json())
      .then((res) => {
        setPins(res.data);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, []);

  // to open the Popup
  const handleClickPin = (id) => {
    setCurrentPlaceId(id);
  };

  // on double click add a pin
  const handleAddNewPin = (e) => {
    if (currentUser) {
      const { lng, lat } = e.lngLat;
      setNewPlace({
        lat,
        lng,
      });
    } else {
      navigate("/:signup");
    }
  };
  // to add && submit the new info entered to the backend
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imgLink) {
      return <h1>Please add an img</h1>;
    }
    fetch("/api/addPin", {
      body: JSON.stringify({
        name: currentUser,
        title,
        desc,
        rating,
        imgLink: imgLink,
        lat: newPlace.lat,
        long: newPlace.lng,
      }),
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setPins([...pins, res.data]); // to add it into the map
        setNewPlace(null); // to close the popup after submit
        setImgLink(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // to delete the popup
  const handleDelete = (_id) => {
    fetch(`/api/deletePin/${_id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div style={{ height: "100vh" }}>
      <MapGL
        initialViewState={{
          latitude: 46,
          longitude: 17,
          zoom: 4,
        }}
        mapLib={maplibregl}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          overflow: "hidden",
        }}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        onDblClick={handleAddNewPin}
      >
        {/* // usin a map to return  for each pin info */}
        {pins.map((info) => (
          <div key={info.timeStamp}>
            <Marker
              style={{ top: "12px", left: "0", position: "absolute" }}
              latitude={info.lat}
              longitude={info.long}
              // offsetLeft={-25}
              offsetTop={-10}
              anchor="bottom"
            >
              <FaMapMarkerAlt
                style={{
                  fontSize: 20,
                  // to konw the user filling the info with blue the othars will be red
                  color: info.name === currentUser ? "blue" : "red",
                  cursor: "pointer",
                }}
                onClick={() => handleClickPin(info._id)}
              />
            </Marker>

            {info._id === currentPlaceId && (
              <Popup
                style={{
                  top: "10px",
                  left: "10px",
                  position: "absolute",
                  border: "2px solid white",
                  background: "white",
                }}
                latitude={info.lat}
                longitude={info.long}
                closeButton={true}
                closeOnClick={false}
                anchor="top-left"
                onClose={() => setCurrentPlaceId(null)}
              >
                <Container>
                  <Label>Place</Label>
                  <h1>{info.title}</h1>
                  <Label>Review</Label>
                  <P>{info.desc}</P>
                  <Label>Ratting</Label>
                  <Stars>
                    {/* to do the rating starts */}
                    {Array(JSON.parse(info.rating)).fill(
                      <AiFillStar key={Math.floor(Math.random()) + 1} />
                    )}
                  </Stars>
                  <Img src={info.imgLink} />
                  <Label>Information</Label>
                  <Span>
                    Created by <b>{info.name}</b>
                  </Span>
                  <Span>{formatDistance(info.timeStamp, new Date())} ago</Span>
                </Container>

                {/* if the name that signin === to the name createing the popup show the delete icon */}
                {info.name === currentUser && (
                  <P3
                    onMouseEnter={() => setIsShown(true)}
                    onMouseLeave={() => setIsShown(false)}
                  >
                    <RiDeleteBin6Line onClick={() => handleDelete(info._id)} />
                    {/* //to show the delete on hover */}
                    {isShown && <Delete>delete</Delete>}
                  </P3>
                )}
              </Popup>
            )}
          </div>
        ))}

        {newPlace && (
          <Popup
            style={{
              top: "10px",
              left: "10px",
              position: "absolute",
              border: "2px solid white",
              background: "white",
            }}
            latitude={newPlace.lat}
            longitude={newPlace.lng}
            closeButton={true}
            closeOnClick={false}
            anchor="top-left"
            onClose={() => setNewPlace(null)}
          >
            <div>
              <Form onSubmit={handleSubmit}>
                <Label>Title</Label>
                <P1>
                  <Input
                    placeholder="Add title"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </P1>
                <Label>Review</Label>
                <P1>
                  <Textarea
                    placeholder="Add Comment"
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </P1>

                <Label>Ratting</Label>
                <Select onChange={(e) => setRating(e.target.value)}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </Select>

                <UploadImages imgLink={imgLink} setImgLink={setImgLink} />

                <Button type="submit">Add Pin</Button>
              </Form>
            </div>
          </Popup>
        )}
      </MapGL>
    </div>
  );
};

export default HomePage;

const Container = styled.div`
  margin: 5px;
  width: 300px;
  height: 350px;
  flex-direction: column;
  display: flex;
  justify-content: space-around;
`;
const Label = styled.label`
  color: red;
  font-size: 13px;
  border-bottom: 0.5px solid red;
  margin: 3px 0;
  width: max-content;
`;
const P = styled.p`
  font-size: 14px;
`;
const Stars = styled.p`
  color: gold;
`;
const Span = styled.span`
  font-size: 12px;
  padding-bottom: 9px;
`;

const Form = styled.form`
  margin: 5px;
  width: 250px;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const Input = styled.input`
  border: none;
  border-bottom: 1px solid gray;
  width: 230px;
`;
const Textarea = styled.textarea`
  border: none;
  border-bottom: 1px solid gray;
  width: 230px;
`;
const P1 = styled.p`
  font-size: 12px;
  color: gray;
  width: 230px; ;
`;
const Select = styled.select`
  width: 230px;
`;
const Button = styled.button`
  cursor: pointer;
  border: none;
  padding: 5px;
  border-radius: 5px;
  color: white;
  background-color: red;
  width: 230px;
`;
const Img = styled.img`
  width: 100px;
`;
const P3 = styled.div`
  margin-left: 30px;
  margin-bottom: -25px;
  cursor: pointer;
  font-size: 23px;
  display: flex;
  align-items: center;
  &:hover {
    color: red;
  }
`;
const Delete = styled.p`
  font-size: 12px;
  background-color: red;
  color: white;
  margin-top: -30px;
  border: 2px solid red;
  border-radius: 7px 7px 7px 0;
  height: 17px;
  display: flex;
  align-items: center;
`;
