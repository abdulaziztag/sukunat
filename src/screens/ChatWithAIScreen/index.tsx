import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ActivityIndicator,
  Card,
  IconButton,
  Text,
  TextInput,
} from 'react-native-paper';
import {
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useActiveTheme} from 'hooks/useActiveTheme.ts';
import React, {useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import {requestToAI} from 'api/chatWithAI.ts';

export const ChatWithAIScreen = () => {
  const activeTheme = useActiveTheme();
  const [message, setMessage] = useState('');
  const [hasAsked, setHasAsked] = useState(true);
  const [messages, setMessages] = useState<
    {message: string; type: 'question' | 'answer'}[]
  >([]);
  const [inputHeight, setInputHeight] = useState(48);

  const askAiMutation = useMutation({
    mutationFn: (msg: string) => requestToAI(msg),
    onSuccess: data => {
      setMessages(prev => [...prev, {message: data.response, type: 'answer'}]);
      setHasAsked(true);
    },
  });

  const sendMessageHandler = () => {
    setMessages(prev => [...prev, {message, type: 'question'}]);
    askAiMutation.mutate(message);
    setMessage('');
    setHasAsked(false);
    setInputHeight(48);
  };

  return (
    <SafeAreaView
      edges={['left', 'right']}
      style={{
        flex: 1,
        backgroundColor: activeTheme.backgroundSecondary,
      }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <ScrollView
            style={{
              flex: 1,
            }}
            contentContainerStyle={{
              flexGrow: !messages.length ? 1 : 0,
              justifyContent: !messages.length ? 'center' : 'flex-start',
              alignItems: !messages.length ? 'center' : 'flex-start',
            }}>
            {!messages.length ? (
              <Text variant={'titleLarge'}>Welcome to KenAI!</Text>
            ) : (
              messages.map((msg, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    maxWidth: msg.type === 'question' ? '80%' : '90%',
                    alignSelf:
                      msg.type === 'question' ? 'flex-end' : 'flex-start',
                  }}>
                  {(!hasAsked || askAiMutation.isPending) &&
                    msg.type === 'question' &&
                    messages.length - 1 === index && (
                      <ActivityIndicator
                        size={'small'}
                        color={activeTheme.textSecondary}
                      />
                    )}
                  <Card
                    contentStyle={{
                      flex: 0,
                    }}
                    style={{
                      margin: 10,
                      padding: 10,
                      alignSelf:
                        msg.type === 'question' ? 'flex-end' : 'flex-start',
                      backgroundColor:
                        msg.type === 'question'
                          ? activeTheme.textPrimary
                          : activeTheme.mainColor,
                    }}>
                    <Text
                      style={{
                        color:
                          msg.type === 'question'
                            ? activeTheme.backgroundPrimary
                            : activeTheme.textPrimary,
                      }}>
                      {msg.message}
                    </Text>
                  </Card>
                </View>
              ))
            )}
          </ScrollView>
          <View
            style={{
              paddingVertical: 10,
              flexDirection: 'row',
              paddingHorizontal: 10,
              backgroundColor: activeTheme.backgroundPrimary,
              alignItems: 'center',
              gap: 10,
            }}>
            <TextInput
              outlineStyle={{
                borderRadius: 20,
              }}
              style={{
                flex: 1,
                height: inputHeight,
              }}
              multiline
              numberOfLines={3}
              value={message}
              onChangeText={setMessage}
              onContentSizeChange={event =>
                setInputHeight(event.nativeEvent.contentSize.height)
              }
              dense
              activeOutlineColor={activeTheme.textPrimary}
              mode={'outlined'}
              placeholder={'Message'}
            />
            <IconButton
              disabled={!message || askAiMutation.isPending || !hasAsked}
              onPress={sendMessageHandler}
              mode={'contained'}
              containerColor={activeTheme.textPrimary}
              iconColor={activeTheme.mainColor}
              icon={'arrow-up'}
              size={28}
              style={{margin: 0}}
            />
          </View>
        </>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
