import React, { useState } from "react";
import { FlatList, Linking, Text, TouchableOpacity } from "react-native";
// @ts-ignore
import styled from "styled-components/native";
import { comment, deleteBlack, dots, add, pdf, share, support } from "../utils/assets";
import { format } from 'date-fns';
import { activityImages, pdfUrl } from "../utils/constants";
import { useActions } from "@root/hooks/useActions";
import Share from 'react-native-share'
import TextField from "@root/components/TextField";
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { useTypedSelector } from "@root/hooks/useTypedSelector";
import { id } from "date-fns/locale";


const Timeline = (item: any) => {
  
  const [addcomment,setAddComment] = useState('')
  const myCustomShare = async (id: any) => {
    const shareOptions = {
      message: id
    }

    try {
      const ShareResponse = await Share.open(shareOptions)
    } catch (error) {

    }
  }
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);
  const [showComment, setShowComent] = useState(false);
  const { setsupport, deleteTimelineItem, getMyTimeline ,addComments} = useActions();
  const {addCommemtData,commentloading} = useTypedSelector((state) => state.addCommemtData);
  const [supportt, setSupport] = useState(false);
  

  return (
    <ParentWarpper>
        <HorizontalWrapper>
        <VerticalWrapper>
          <CapText>{item.item.category.substring(0, 1).toUpperCase()}</CapText>
          <DateText>{format(new Date(item.item.created_at), 'do')}</DateText>
          <MonthWrapper>
            <MonthText>
              {format(new Date(item.item.created_at), 'MMM')}
            </MonthText>
          </MonthWrapper>
        </VerticalWrapper>
        <DataWrapper>
          <HorizontalWrapper>
            <VerticalWrapperLeft>
              <TitleText numberOfLines={1}>{item.item.title}</TitleText>
              <SubTitleText>
                {item.item.category}
              </SubTitleText>

              <SubTitleText>
                {format(new Date(item.item.created_at), 'HH:mm')}
              </SubTitleText>

              {
                item.item.media_type === "1"
                  ? <ImageWrapper source={{ uri: activityImages + item.item.content }} />
                  : item.item.media_type === "2" ? <TouchableOpacity onPress={() => { Linking.openURL(item.item.content) }}><ActivityText>{item.item.content}</ActivityText></TouchableOpacity>
                    : item.item.media_type === "3" ? <Text>Audio</Text>
                      : item.item.media_type === "4" ? <ActivityText>{item.item.content}</ActivityText>
                        : item.item.media_type === "5" ? <TouchableOpacity onPress={() => { Linking.openURL(pdfUrl + item.item.content) }}><PDFImage source={pdf}></PDFImage></TouchableOpacity>
                          : item.item.media_type === "6" ? <Text>{item.item.content}</Text> : <Text></Text>

              }
            </VerticalWrapperLeft>

            <TouchableOpacity onPress={() => {

            }}>

              <Menu
                visible={visible}
                anchor={<Text style={{ fontWeight: '800' }} onPress={showMenu}>. . .</Text>}
                onRequestClose={hideMenu}
              >
                <MenuItem onPress={() => { alert(item.item.id) }}>Edit</MenuItem>
                <MenuItem onPress={async () => { await deleteTimelineItem({ id: item.item.id }), getMyTimeline() }}>Delete</MenuItem>

                <MenuDivider />

              </Menu>
            </TouchableOpacity>

          </HorizontalWrapper>



          {
            showComment ? item && Object.keys(item).length > 0 ?
              item.item.comments.map((item: any) => (

                <HorizontalWrapper>
                  <Text>{item.comment}</Text>
                  <Text>{item && Object.keys(item).length > 0 ? item.created_at.split(' ')[1].substring(4) : 'Eror'}</Text>
                </HorizontalWrapper>
              )) : <Text></Text> : <Text></Text>
          }

          <HorizontalWrapper>

            <TouchableOpacity onPress={async () => {
              {
                setSupport(!supportt)
                await setsupport({
                  id: item.item.id,
                  support_type: item.item.is_support === 1 ? 0 : 1
                })
              }
            }}>

              <VerticalWrapper>
                <Dots source={support} />
                <Text>{supportt === true ? item.item.is_support === 0 ? 'Unsupport' : 'Support' : item.item.is_support === 1 ? 'Unsupport' : 'Support'}</Text>
              </VerticalWrapper>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => {
              setShowComent(!showComment)
            }}>
              <VerticalWrapper>
                <Dots source={comment} />
                <Text>{item.item.comment_count} Comment</Text>
              </VerticalWrapper>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { myCustomShare('activity/' + item.item.id) }}>
              <VerticalWrapper>
                <Dots source={share} />
                <Text>Share</Text>
              </VerticalWrapper>
            </TouchableOpacity>


          </HorizontalWrapper>

          <CommentSection>
            <CommentField>
              <TextField placeholder={'Comment'}  onChangeText={(value: any) => {
                        setAddComment(value)
                        }}>

              </TextField>
            </CommentField>

            <TouchableOpacity onPress={async ()=> {
              if (addcomment != '') {
                 addComments({activity_id: item.item.id, comment: addcomment})
                getMyTimeline()
              }
              }}>
              <AddBtn source={add} />
            </TouchableOpacity>

          </CommentSection>
        </DataWrapper>
      </HorizontalWrapper>

      <Divider />
    </ParentWarpper>
  );
}

export default Timeline;

const AddBtn = styled.Image`
margin:10px;
`;
const CommentField = styled.View`
width:90%;
`;
const CommentSection = styled.View`
padding-left:10px;
flex-direction:row;
align-items:center;
`;

const Divider = styled.View`
  height: 1px;
  width: 75%;
  background-color: ${({ theme }: any) => theme.colors.darkGray};
`;
const ActivityText = styled.Text`
font-size: ${({ theme }: any) => theme.fontSize.cardTitle};
  color: black;
  margin-top: 10px;
`;

const VerticalWrapperLeft = styled.View`
  flex-direction: column;
`;

const ImageWrapper = styled.Image`
height: 150px;
  width: 100%;
`;

const PDFImage = styled.Image`
width: 80px;
  height: 100px;
`;
const SubTitleText = styled.Text`
  font-size:  ${({ theme }: any) => theme.fontSize.cardSubTitle};
  color: black;
  margin-left: 5px;
`;


const Dots = styled.Image`
  margin-top: 10px;
  margin-right: 10px;
`;

const TitleText = styled.Text`
  font-size: 16px;
  color: black;
  margin-left: 5px;
  margin-top: 5px;
  font-weight: bold;
`;

const DataWrapper = styled.View`
  width: 75%;
  margin-left: 10px;
  border-radius: 10px;
  background-color:${({ theme }: any) => theme.colors.lightBlue};
`;

const MonthText = styled.Text`
  font-size:  ${({ theme }: any) => theme.fontSize.cardSubTitle};
  color: white;
`;

const MonthWrapper = styled.View`
  border-radius: 5px;
  margin-top: 5px;
  width: 80px;
  height: 35px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }: any) => theme.colors.blue};
`;

const DateText = styled.Text`
  font-size: 20px;
  color: black;
`;

const CapText = styled.Text`
  font-size: 40px;
  color: black;
`;

const VerticalWrapper = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HorizontalWrapper = styled.View`
  display: flex;
  margin: 5px 0;
  padding: 5px;
  flex-direction: row;
  justify-content: space-between;
`;

const ParentWarpper = styled.View`
  justify-content: flex-end;
  align-items: flex-end;
`;

