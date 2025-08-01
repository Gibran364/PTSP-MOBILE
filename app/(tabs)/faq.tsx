import React from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';

// OUR ICONS
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// OUR COMPONENTS
import ButtonShopAndChat from '@/components/buttonShopAndChat';

// OUR HOOKS
import useDropdownAnimation from '@/hooks/Frontend/faqScreen/useAnimationFaq';

// OUR CONSTANTS
import dataFaq from '@/constants/dataFaq';

// OUR INTERFACES
import { ButtonCustomProps } from '@/interfaces/buttonCustomProps';

// OUR UTILS
import { getHeaderPaddingVertical } from '@/utils/platformStyleAndroidIos';

export default function FAQ({ count = 1 }: ButtonCustomProps) {
  const headerPaddingVertical = getHeaderPaddingVertical();

  const { openIndex, animatedValues, toggleDropdown } = useDropdownAnimation(
    dataFaq.length
  );

  return (
    <View className="flex-1 gap-4 bg-white">
      {/* HEADER */}
      <View
        className={`w-full flex-row items-center justify-between rounded-b-[10px] bg-[#1475BA] px-6 shadow-md ${headerPaddingVertical}`}
      >
        <Image
          source={require('@/assets/images/HomeScreen/logo.png')}
          className="h-12 w-44 object-cover"
        />
        <View className="flex-row items-center gap-6">
          <ButtonShopAndChat />
        </View>
      </View>

      {/* BODY */}
      <View className="flex-1 px-4">
        <View className="w-full flex-1 py-6">
          <Text
            className="text-[20px] font-bold"
            style={{ fontFamily: 'LexBold' }}
          >
            Frequently Asked Questions
          </Text>

          <ScrollView
            contentContainerStyle={{ padding: 24 }}
            showsVerticalScrollIndicator={false}
          >
            {dataFaq.map((item, index) => (
              <View key={index} className="mb-4 rounded-[10px] bg-white">
                {/* Header Pertanyaan */}
                <TouchableOpacity
                  onPress={() => toggleDropdown(index)}
                  activeOpacity={0.8}
                  className="w-full flex-row items-center justify-between rounded-[10px] bg-[#3498DB] p-4"
                >
                  <View className="flex-1 pr-2">
                    <Text
                      className="text-[16px] text-black"
                      style={{ fontFamily: 'LexMedium' }}
                    >
                      {item.question}
                    </Text>
                  </View>
                  <MaterialIcons
                    name={
                      openIndex === index
                        ? 'keyboard-arrow-up'
                        : 'keyboard-arrow-down'
                    }
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>

                {/* Jawaban */}
                {openIndex === index && (
                  <Animated.View
                    style={{
                      height: animatedValues[index].height,
                      opacity: animatedValues[index].opacity,
                      overflow: 'hidden',
                      paddingHorizontal: 16,
                      paddingVertical: 10,
                    }}
                  >
                    <ScrollView
                      showsVerticalScrollIndicator
                      nestedScrollEnabled
                    >
                      {item.answerType === 'text' ||
                      typeof item.answer === 'string' ? (
                        <Text
                          className="text-[14px] text-gray-800"
                          style={{ fontFamily: 'LexRegular' }}
                        >
                          {item.answer}
                        </Text>
                      ) : Array.isArray(item.answer) ? (
                        item.answer.map((ans: string, i: number) => (
                          <Text
                            key={i}
                            className="mb-2 text-[14px] text-gray-800"
                            style={{ fontFamily: 'LexRegular' }}
                          >
                            • {ans}
                          </Text>
                        ))
                      ) : null}
                    </ScrollView>
                  </Animated.View>
                )}
              </View>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* FOOTER */}
      <View className="h-[4%] w-full bg-[#1475BA]" />
    </View>
  );
}
