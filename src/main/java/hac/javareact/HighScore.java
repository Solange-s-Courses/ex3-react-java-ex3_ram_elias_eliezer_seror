package hac.javareact;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

public class HighScore implements Serializable {

    /**
     Saves a new score to a file and updates the user score in file if the user already exists.
     The file is sorted in descending order and only the top 5 scores are saved.
     @param fileName the name of the file to save the scores to.
     @param newScore the new score to add or update in the file.
     @throws IOException if an I/O error occurs while reading or writing to the file.
     */
    public synchronized void saveToFile(String fileName, Score newScore) throws IOException {
        List<Score> scores;
        File file = new File(fileName);

        // Read existing scores from file or create a new list if the file does not exist
        if (file.exists() && file.length() > 0) {
            // Read existing data from file
            try (FileInputStream fis = new FileInputStream(file);
                 ObjectInputStream ois = new ObjectInputStream(fis)) {
                scores = (List<Score>) ois.readObject();
            } catch (ClassNotFoundException e) {
                throw new IOException("Error reading scores from file: " + e.getMessage());
            } catch (IOException e) {
                throw new IOException("Error reading scores from file: " + e.getMessage());
            }
        } else {
            // If the file doesn't exist or is empty, create a new list
            scores = new ArrayList<>();
        }


        // Add the new score to the list or update the existing score
        boolean updated = false;
        for (int i = 0; i < scores.size(); i++) {
            Score score = scores.get(i);
            if (score.getUserName().equals(newScore.getUserName())) {
                // Update the score if the user name already exists
                if (newScore.getScore() < score.getScore()) {
                    scores.set(i, newScore);
                }
                updated = true;
                break;
            }
        }
        if (!updated) {
            // Add the new score to the list if the user name doesn't exist
            scores.add(newScore);
        }

        // Sort the scores in descending order
        scores.sort((s1, s2) -> s2.getScore() - s1.getScore());

        // Save only the top 5 scores
        List<Score> topScores = scores.stream().limit(5).collect(Collectors.toList());

        // Write the top 5 scores back to the file
        try (ObjectOutputStream oos = new ObjectOutputStream(Files.newOutputStream(Paths.get(fileName)))) {
            oos.writeObject(topScores);
        }
    }

    /**
     Loads high scores from a file.
     @param fileName the name of the file to load the scores from.
     @return a HighScore object containing the high scores.
     @throws IOException if an I/O error occurs while reading from the file.
     @throws ClassNotFoundException if the class of the serialized object cannot be found.
     */
    public static synchronized HighScore loadFromFile(String fileName) throws IOException, ClassNotFoundException {
        HighScore highScore = null;
        try {
            FileInputStream fis = new FileInputStream(fileName);
            ObjectInputStream ois = new ObjectInputStream(fis);
            highScore = (HighScore) ois.readObject();
            ois.close();
            fis.close();
        } catch (FileNotFoundException e) {
            System.err.println("File not found: " + fileName);
            e.printStackTrace();
        } catch (IOException e) {
            System.err.println("Error reading from file: " + fileName);
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            System.err.println("Class not found: " + e.getMessage());
            e.printStackTrace();
        }
        return highScore;
    }
}