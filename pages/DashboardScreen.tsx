import TicketLayout from '@/components/TicketLayout';
import Images from '@/constant/image';
import {
  Entypo,
  FontAwesome5,
  FontAwesome6
} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

// Color Palette Matching the UI
const COLORS = {
  bg: '#FFFFFF',
  textDark: '#0D2353',
  textMuted: '#3D5276',
  bluePrimary: '#0052CC',

  // Quick Actions (Journey Planner) Card Colors
  cardReserved: '#D1E3FF',
  cardUnreserved: '#FFD9D9',
  cardPlatform: '#FFE6CC',

  // More Offerings Icon Background Gradients/Colors
  iconPink: '#FFF0F3',
  iconGreen: '#E6F9EE',
  iconBlue: '#E6F0FF',
  iconYellow: '#FFF7E6',
  iconPurple: '#EEECFC',
  iconGray: '#F2F2F2',
  iconCoral: '#FFF0EC',
  iconWaved: '#525470',
};

export default function HomeScreen() {
  return (
    // <SafeAreaView style={styles.container}>
    //   <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={styles.scrollContent}>
    <View >
      {/* Welcome Greeting */}
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>Hi, Rahul Singh!</Text>
      </View>

      {/* Section: Journey Planner */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Journey Planner</Text>
        <View style={styles.plannerRow}>

          {/* Reserved Card */}
          <TouchableOpacity style={styles.plannerCard}>
            <View style={[styles.cardIllustration, { backgroundColor: COLORS.cardReserved }]}>
              <Image source={Images.reserve} style={styles.cardImage}
                resizeMode="contain" />
            </View>
            <Text style={styles.plannerCardLabel}>Reserved</Text>
          </TouchableOpacity>

          {/* Unreserved Card */}
          <TouchableOpacity style={styles.plannerCard}>
            <View style={[styles.cardIllustration, { backgroundColor: COLORS.cardUnreserved }]}>
              <Image source={Images.unseserve} style={styles.cardImage}
                resizeMode="contain" />
            </View>
            <Text style={styles.plannerCardLabel}>Unreserved</Text>
          </TouchableOpacity>

          {/* Platform Card */}
          <TouchableOpacity style={styles.plannerCard}>
            <View style={[styles.cardIllustration, { backgroundColor: COLORS.cardPlatform }]}>
              <Image source={Images.platform} style={styles.cardImage}
                resizeMode="contain" />
            </View>
            <Text style={styles.plannerCardLabel}>Platform</Text>
          </TouchableOpacity>

        </View>
      </View>

      {/* Section: More Offerings */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>More Offerings</Text>

        <View style={styles.gridContainer}>
          {/* Row 1 */}
          <View style={styles.gridRow}>

            <TouchableOpacity style={styles.gridItem}>
              <View style={[styles.iconWrapper, { backgroundColor: COLORS.iconPink }]}>
                <Image source={Images.searchTrain} style={styles.cardImage}
                  resizeMode="contain" />
              </View>
              <Text style={styles.gridLabel} numberOfLines={2}>Search{'\n'}Trains</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridItem}>
              <View style={[styles.iconWrapper, { backgroundColor: COLORS.iconGreen }]}>
                <Image source={Images.pnrStatus} style={styles.cardImage}
                  resizeMode="contain" />
              </View>
              <Text style={styles.gridLabel} numberOfLines={2}>PNR{'\n'}Status</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridItem}>
              <View style={[styles.iconWrapper, { backgroundColor: COLORS.iconBlue }]}>
                <Image source={Images.coachPosition} style={[styles.cardImage, { tintColor: '#007AFF' }]}  // blue tint
                  resizeMode="contain" />
              </View>
              <Text style={styles.gridLabel} numberOfLines={2}>Coach{'\n'}Position</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridItem}>
              <View style={[styles.iconWrapper, { backgroundColor: COLORS.iconYellow }]}>
                <Image source={Images.trackTrain} style={[styles.cardImage, { tintColor: '#f4bd32' }]}  // blue tint
                  resizeMode="contain" />
              </View>
              <Text style={styles.gridLabel} numberOfLines={2}>Track Your{'\n'}Train</Text>
            </TouchableOpacity>

          </View>

          {/* Row 2 */}
          <View style={styles.gridRow}>

            <TouchableOpacity style={styles.gridItem}>
              <View style={[styles.iconWrapper, { backgroundColor: COLORS.iconPurple }]}>
                <Image source={Images.orderFood} style={[styles.cardImage, { tintColor: '#7F56D9' }]}  // blue tint
                  resizeMode="contain" />
              </View>
              <Text style={styles.gridLabel} numberOfLines={2}>Order{'\n'}Food</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridItem}>
              <View style={[styles.iconWrapper, { backgroundColor: COLORS.iconGray }]}>
                <Image source={Images.fileRefund} style={[styles.cardImage, { tintColor: '#4F4F4F' }]}  // blue tint
                  resizeMode="contain" />
              </View>
              <Text style={styles.gridLabel} numberOfLines={2}>File{'\n'}Refund</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridItem}>
              <View style={[styles.iconWrapper, { backgroundColor: COLORS.iconCoral }]}>
                <FontAwesome5 name="hands-helping" size={22} color="#FF7A59" />
              </View>
              <Text style={styles.gridLabel} numberOfLines={2}>Rail{'\n'}Madad</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridItem}>
              <View style={[styles.iconWrapper, { backgroundColor: COLORS.iconWaved }]}>
                <Image source={Images.goToWaved} style={[styles.cardImage, { tintColor: '#FFFFFF' }]}  // blue tint
                  resizeMode="contain" />
              </View>
              <Text style={styles.gridLabel} numberOfLines={2}>Go To{'\n'}WAVES</Text>
            </TouchableOpacity>

          </View>
        </View>

      </View>

      {/* Section: Upcoming Journey */}
      <View style={[styles.sectionContainer, { marginBottom: 30 }]}>
        <Text style={styles.sectionTitle}>Upcoming Journey</Text>
        <TicketLayout />
      </View>

      <View style={[styles.sectionContainer, { marginBottom: 30 }]}>
        <Text style={{ ...styles.sectionTitle, marginBottom: -40 }}>Follow Us On Social Media Platforms</Text>
        <View className="flex-1 justify-center items-center relative" >
          <Image source={Images.SocialMedia} style={{
            width: "95%",
            height: 300,
            opacity: 0.88, // Adjust opacity (0 to 1)
          }} resizeMode="contain" />
          <View className="flex-row justify-center items-center gap-6 absolute" >
            <FontAwesome6 name="x-twitter" className="p-1 bg-black rounded-full" size={22} color="white" />
            <FontAwesome5 name="facebook" size={32} color="#0066fe" />
            <LinearGradient
              colors={["#833ab4", "#fd1d1d", "#fcb045"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome6
                name="instagram"
                size={24}
                color="white"
              />
            </LinearGradient>
            <Entypo name="youtube" size={35} color="red" />
          </View>
        </View>
      </View>
      {/* </ScrollView>
    </SafeAreaView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scrollContent: {
    paddingHorizontal: 10,
    paddingTop: 14,
  },
  greetingContainer: {
    marginBottom: 20,
    // paddingTop: 100,
  },
  greetingText: {
    fontSize: 12,
    fontWeight: '300',
    color: COLORS.textDark,
    letterSpacing: 0.2,
    fontFamily: "app-regular"
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: COLORS.textDark,
    marginBottom: 14,
    fontFamily: "app-regular"
  },
  plannerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  plannerCard: {
    width: (width - 32 - 24) / 3, // dynamically calculate width based on view padding and gaps
    alignItems: 'center',
  },
  cardIllustration: {
    width: '100%',
    height: 90,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardImage: {
    width: '100%',
    height: '100%',
  },
  plannerCardLabel: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textMuted,
    fontFamily: "app-regular"
  },
  gridContainer: {
    marginTop: 4,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  gridItem: {
    width: (width - 32 - 36) / 4,
    alignItems: 'center',
  },
  iconWrapper: {
    width: 62,
    height: 62,
    borderRadius: 14,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  gridLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textDark,
    textAlign: 'center',
    lineHeight: 16,
    fontFamily: 'app-regular'
  },
  ticketCard: {
    width: '100%',
    height: 140,
    borderRadius: 24,
    backgroundColor: '#7A62F9', // gradient base tone matching the screenshot's purple accent
    overflow: 'hidden',
  },
  ticketCardTop: {
    height: 44,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
    position: 'relative',
  },
  ticketDateText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  notchCircle: {
    position: 'absolute',
    right: 28,
    bottom: -10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.bg, // Cuts out a ticket punch effect
    zIndex: 10,
  },
  ticketCardBody: {
    flex: 1,
    padding: 20,
  },
  ticketPlaceholderLine: {
    width: '60%',
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});