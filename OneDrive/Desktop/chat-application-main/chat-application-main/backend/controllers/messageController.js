// import { Message } from "../models/messageModel.js";
// import {Conversation} from "../models/conversationModel.js"
// import { getReceiverSocketId, io } from "../socket/socket.js";



// export const sendMessage = async (req, res) => {
//    try {
//       const senderId = req.id;
//       const receiverId = req.params.id;
//       const {message} = req.body;


//        // Validate senderId and receiverId
//     if (!senderId || !receiverId) {
//       return res.status(400).json({
//         success: false,
//         message: "Sender and receiver IDs are required.",
//       });
//     }

//       let gotConversation = await Conversation.findOne({ participants:{$all : [senderId, receiverId]},})

//       if(!gotConversation){
//         gotConversation = await Conversation.create({ participants:[senderId, receiverId] });
//       };


//       const newMessage = await Message.create({
//         senderId,
//         receiverId,
//         message,
//       })

//       if(newMessage) {
//         gotConversation.messages.push(newMessage._id);
//       };

//       // await gotConversation.save();
      
//       await Promise.all([gotConversation.save(),newMessage.save()])

//       // socket io

//       const receiverSocketId = getReceiverSocketId(receiverId)

//       if(receiverSocketId){
//         io.to(receiverSocketId).emit("newMessage",newMessage);
//       }


//       return res.status(201).json({
//         message:"Message send successfully",newMessage,
//         success: true,
//       })
//    } catch (e) {
//       console.log(e);
//       return res.status(500).json({
//         message: "Internal server error",
//         success: false,
//       });
      
//    }
// };


// export const getMessage = async (req, res) => {
//   try{
//     const receiverId = req.params.id;
//     const senderId = req.id;


//     if (!senderId || !receiverId) {
//       return res.status(400).json({
//         success: false,
//         message: "Sender and receiver IDs are required.",
//       });
//     }


//     const conversation = await Conversation.findOne({
//       participants:{$all:[senderId,receiverId]}

//     }).populate("messages")
//     // console.log("conversation",conversation);


//      // Handle cases where no conversation exists
//      if (!conversation) {
//       return res.status(404).json({
//         success: false,
//         message: "No conversation found between these participants.",
//       });
//     }

  
//     return res.status(200).json({
//       success: true,
//       messages: conversation.messages,
//     });
//   }
//   catch(e){
//     console.error("Error in getMessage:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error.",
//     });

//   }
// }


// export const editMessage = async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log("Request Body:", req.body); 
//     const { newMessage } = req.body;
    
//     console.log("Updating message ID:", id);
//     console.log("New message content:", newMessage);

//     const updatedMessage = await Message.findByIdAndUpdate(
//       id,
//       { message: newMessage },
//       { new: true }
//     );

//     if (!updatedMessage) {
//       console.log("Message not found");
//       return res.status(404).json({ message: "Message not found" });
//     }

//     console.log("Updated message:", updatedMessage);
//     res.json(updatedMessage);
//   } catch (error) {
//     console.error("Error updating message:", error);
//     res.status(500).json({ message: "Error updating message", error });
//   }
// };





import { Message } from "../models/messageModel.js";
import {Conversation} from "../models/conversationModel.js"
import { getReceiverSocketId, io } from "../socket/socket.js";



export const sendMessage = async (req, res) => {
   try {
      const senderId = req.id;
      const receiverId = req.params.id;
      const {message} = req.body;


       // Validate senderId and receiverId
    if (!senderId || !receiverId) {
      return res.status(400).json({
        success: false,
        message: "Sender and receiver IDs are required.",
      });
    }

      let gotConversation = await Conversation.findOne({ participants:{$all : [senderId, receiverId]},})

      if(!gotConversation){
        gotConversation = await Conversation.create({ participants:[senderId, receiverId] });
      };


      const newMessage = await Message.create({
        senderId,
        receiverId,
        message,
      })

      if(newMessage) {
        gotConversation.messages.push(newMessage._id);
      };

      // await gotConversation.save();
      
      await Promise.all([gotConversation.save(),newMessage.save()])

      // socket io

      const receiverSocketId = getReceiverSocketId(receiverId)

      if(receiverSocketId){
        io.to(receiverSocketId).emit("newMessage",newMessage);
      }


      return res.status(201).json({
        message:"Message send successfully",newMessage,
        success: true,
      })
   } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
      
   }
};


export const getMessage = async (req, res) => {
  try{
    const receiverId = req.params.id;
    const senderId = req.id;


    if (!senderId || !receiverId) {
      return res.status(400).json({
        success: false,
        message: "Sender and receiver IDs are required.",
      });
    }


    const conversation = await Conversation.findOne({
      participants:{$all:[senderId,receiverId]}

    }).populate("messages")
    // console.log("conversation",conversation);


     // Handle cases where no conversation exists
     if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "No conversation found between these participants.",
      });
    }

  
    return res.status(200).json({
      success: true,
      messages: conversation.messages,
    });
  }
  catch(e){
    console.error("Error in getMessage:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });

  }
}


export const editMessage = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Request Body:", req.body); 
    const { newMessage } = req.body;
    
    console.log("Updating message ID:", id);
    console.log("New message content:", newMessage);

    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      { message: newMessage },
      { new: true }
    );

   if (!conversation || conversation.messages.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Let's start a conversation", 
        messages: [],
      });
    }

    console.log("Updated message:", updatedMessage);
    res.json(updatedMessage);
  } catch (error) {
    console.error("Error updating message:", error);
    res.status(500).json({ message: "Error updating message", error });
  }
};





