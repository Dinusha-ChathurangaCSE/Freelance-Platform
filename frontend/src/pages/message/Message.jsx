import React from "react";
import { Link, useParams } from "react-router-dom";
import "./Message.scss";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Message = () => {

  const{id} = useParams()
  const queryClient = useQueryClient();
    
  const { isLoading, error, data } = useQuery({
    queryKey: ['messages'],
    queryFn: () =>
      newRequest.get(`/message/${id}`).then(res =>{
        return res.data
      })
  })


  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link> {">"} John Doe {">"}
        </span>
        {isLoading?"loading": error? "error":
        <div className="messages">
          {data.map(m => (
          <div className="item" key={m._d}>
            <img
              src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            <p>
             {m.desc}
            </p>
          </div>
        
          ))}
          
          
        </div>
      }
        <hr />
        <div className="write">
          <textarea type="text" placeholder="write a message" />
          <button>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Message;
