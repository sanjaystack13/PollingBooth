{/* <Container fluid className="bodyyy">
      <Row style={{ height: "20vh" }}></Row>
      <Row style={{ height: "60vh" }}>
        <Col lg={3} xs={12}></Col>
        <Col lg={6} xs={12}>
          <Card className="ApiLogin">
            <h1 className="titleapi">API LOGIN</h1>

            <Form.Label className="formusername">UserName:</Form.Label>
            <input
              className="inputuser"
              type="text"
              value={username}
              placeholder="Enter sanjay"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            ></input>
            <br />
            <Form.Label className="formpassword">Password:</Form.Label>
            <input
              className="inputpass"
              type="password"
              value={password}
              placeholder="Enter sanju13"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
            <br />
            <Button className="submit" onClick={handleSubmit}>Login</Button>
          </Card>
        </Col>
        <Col lg={3} xs={12}></Col>
      </Row>
      <Row style={{ height: "20vh" }}></Row>
    </Container>
   */}

//    {item.options.map((opti,ind) => {
//     const totalvotes = item.options.reduce(
//       (total,option)=> total + option.count,0
//     );
//     const percentage = totalvotes > 0 ? (opti.count/totalvotes)*100 : 0;
//    return (
//     <div
//       key={ind._id}
//       onClick={() => handleOption(item._id, ind.option)}
//     >
//       <input
//         type="radio"
//         name={`option-${ind._id}`}
//         value={ind.option}
//         checked={
//           selectedOption &&
//           selectedOption._id === item._id &&
//           selectedOption.option === ind.option
//         }
//       />
//       <label>{ind.option}</label>
//       <div className="bar">
//     <div
//       className="filled-bar"
//       style={{
//         width: `${item.votePercentage }%`,
//       }}
//     ></div>
//   </div>
//   <p>{item.votePercentage }%</p>
// </div>
//     </div>
// }))}
// return (
//   <Container fluid style={{ height: "100vh" }}>
//     <>
//       {data.map((item) => {

//         const totalVotersCount = item.options.reduce((total, option) => total + option.voters.length, 0);

//         return (
//           <Card key={item._id} className="cardcolor">
//             <b>{item.createdBy.user_name}</b><br />
//             {item._id}<br />
//             {item.title}<br />
//             {item.question}<br />

//             <div style={{ display: item.createdBy.isVoted ? "block" : "none" }}>
//               {item.options.map((opti) => {
//                 const percentage = totalVotersCount > 0 ? (opti.count / totalVotersCount) * 100 : 0;
//                 return (
//                   <div key={opti._id} className="barct">
                   
//                     <div className="bar">
//                       <div className="filledbar"
//                         style={{
//                           width: `${percentage}%`,
//                         }}
//                       >
//                          <label>{opti.option}</label>
//                         <span className="percentage-text">
//                           {percentage.toFixed()}%
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                 )
//               })}
//             </div>

//             <div style={{ display: item.createdBy.isVoted ? "none" : "block" }}>
//               {item.options.map((ind) => (
//                 <div key={ind._id} onClick={() => Handlesubmit(item._id, ind.option)}>
//                   <input
//                     type="radio"
//                     name={`option-${item._id}`}
//                     value={ind.option}
//                     checked={
//                       selectedoption &&
//                       selectedoption._id === item._id &&
//                       selectedoption.option === ind.option
//                     }
//                   />
//                   <label>{ind.option}</label>
//                 </div>
//               ))}
//             </div>
//             {item.category.map((inde) => (
//               <div key={inde._id}>
//                 <button>{inde.category_name}</button>
//               </div>
//             ))}
//             <br />
//             {item.createdBy.isVoted ? (
//               <button onClick={() => handleunvote(item._id)} className="voteless">Unvote</button>
//             ) : (
//               <button onClick={() => Votebutton(item._id)} className="votein">Vote</button>
//             )}
//             <br />
//             <Row>
//               <Col xs={3} md={3} lg={3} xl={3}>
//                 <i
//                   className={
//                     gliked.includes(item._id) ? "bi bi-heart-fill" : "bi bi-heart"
//                   }
//                   style={{
//                     color: gliked.includes(item._id) ? "red" : "inherit",
//                     cursor: "pointer",
//                   }}
//                   onClick={() => handleLike(item._id)}
//                 >
//                   {likeCounts[item._id]} Like
//                 </i>
//               </Col>
//               <Col xs={3} md={3} lg={3} xl={3}>
//                 <i class="bi bi-person">{totalVotersCount}voters</i>
//               </Col>
//               <Col xs={3} md={3} lg={3} xl={3}>
//                 <i class="bi bi-chat-left-quote" onClick={() => handleToggleCommentBox(item._id)}>Comments</i>



//               </Col>
//               <Col xs={3} md={3} lg={3} xl={3}>
//                 <i class="bi bi-share">Share</i>
//               </Col>
//             </Row>
//             {isCommentVisible === item._id && (

//               <div >
//                 {item.comments && item.comments.length > 0 && (
//                   <div style={{ marginTop: '10px' }}>
//                     {item.comments.map((com) => (
//                       <Row>
//                         <Col lg={2}>
//                         <i  className='personicon'class="bi bi-person"></i>
//                          </Col>
//                         <Col lg={9}>
//                           <Card className="Commentcard">  
                         
//                             <Container key={com._id} style={{ marginBottom:'5px' }}>
                            
//                               <p><b>Posted by:</b>{com.user_id.user_name} </p>
                              
//                               <p><b>Posted At:</b>{new Date(com.created_at).toLocaleString()}</p>
                              
//                               <p><b>comment:</b>{com.comment}</p>
//                             </Container>
//                           </Card>
//                         </Col>
//                         <Col lg={1}>
//                         {/* <i class="bi bi-suit-heart"></i>
//                          <i class="bi bi-chat-left-quote"></i> */}
//                           <Row>
//                             <Col>
//                             <i class="bi bi-suit-heart"></i>
                            
  
//                             </Col>
//                             <br/>
//                             <br/>
                    
//                             <Col>
//                             <i class="bi bi-reply-fill"></i>
//                             </Col>
                            
//                           </Row>
//                         </Col>

//                       </Row>
//                     ))}
//                   </div>
//                 )}
//                 <textarea
//                   value={commenttype}
//                   onChange={(e) => setCommenttype(e.target.value)}
//                   placeholder="Write your comment here..."
//                   rows="4"
//                   style={{ width: '100%', height: '10%', marginTop: '10px' }}
//                 />
//                 <Button
//                   onClick={() => handlecomment(item._id)} // Pass funct// Pass function reference with parameter
//                   style={{ display: 'block', marginTop: '10px' }}
//                 >
//                   Submit Comment
//                 </Button>
//               </div>
//             )}

//           </Card>
//         );
//       })}
//     </>

//   </Container>
// );
const currentTime = +new Date() ;//current time 
const targetTime = +new Date(createdTime);//poll created time 
const timeDifference = (currentTime - targetTime + 5.5 * 60 * 60 * 1000);
const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
// let seconds = Math.floor((timeDifference / 1000) % 60);
// let minutes = Math.floor((timeDifference / 1000 / 60) % 60);
// let hours = Math.floor((timeDifference / 1000 / 60 / 60) % 24);
// let days = Math.floor((timeDifference / 1000 / 60 / 60 / 24) % 30);
let months = Math.floor((timeDifference / 1000 / 60 / 60 / 24 / 30) % 12);
let years = Math.floor(timeDifference / 1000 / 60 / 60 / 24 / 365);