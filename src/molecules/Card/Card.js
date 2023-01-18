// molecules/Card/Card.js
import React from 'react';
import { View, Text } from 'react-native';
import { Button, styles as buttonStyles } from '../../atoms/Button';

const Card = ({ title, onPress }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Button title="Buy Now" onPress={onPress} style={buttonStyles.button} />
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Card;
