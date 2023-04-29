package hac.javareact;

import java.io.*;
import java.util.*;
import java.util.stream.Collectors;

public class HighScore implements Serializable {
    private static final long serialVersionUID = 1L;

    private static final int MAX_SCORES = 10;
    public List<Score> scores;

    public HighScore() {
        scores = new ArrayList<>();
    }

    public synchronized void addScore(Score score) {
        System.out.println("I'm in add score");

        for (Score s : scores) {
            if (s.getUserName().equals(score.getUserName())) {
                // Update the score for an existing user
                s.setScore(Math.min(s.getScore(), score.getScore()));
                return;
            }
        }
        // Add a new score for a new user
        scores.add(score);
        Collections.sort(scores);
        if (scores.size() > MAX_SCORES) {
            scores.remove(scores.size() - 1);
        }
        for (Score s : scores) {
            System.out.println(s.getUserName() + " : " + s.getScore());
        }
    }

    public synchronized List<Score> getTopScores() {
        return new ArrayList<>(scores);
    }

    public synchronized void saveToFile(String fileName, Score newScore) throws IOException {
        List<Score> scores;
        File file = new File(fileName);

        if (file.exists() && file.length() > 0) {
            // Read existing data from file
            try (FileInputStream fis = new FileInputStream(file);
                 ObjectInputStream ois = new ObjectInputStream(fis)) {
                scores = (List<Score>) ois.readObject();
            } catch (ClassNotFoundException e) {
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
        scores.sort((s1, s2) -> s1.getScore() - s2.getScore());

        // Remove duplicates
        Set<String> uniqueNames = new HashSet<>();
        List<Score> uniqueScores = new ArrayList<>();
        for (Score score : scores) {
            if (uniqueNames.add(score.getUserName())) {
                uniqueScores.add(score);
            }
        }

        // Save only the top 5 scores
        List<Score> topScores = uniqueScores.stream().limit(5).collect(Collectors.toList());

        // Write the top 5 scores back to the file
        try (FileOutputStream fos = new FileOutputStream(file);
             ObjectOutputStream oos = new ObjectOutputStream(fos)) {
            oos.writeObject(topScores);
        }
    }


    // Helper method to get the index to add the new score
    private int getIndexToAddScore(List<Score> scores, Score newScore) {
        int index = 0;
        for (int i = 0; i < scores.size(); i++) {
            if (newScore.getScore() > scores.get(i).getScore()) {
                index = i;
                break;
            } else {
                index = i + 1;
            }
        }
        return index;
    }
    public static synchronized HighScore loadFromFile(String fileName) throws IOException, ClassNotFoundException {
        System.out.println("2");
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
        System.out.println("3");
        return highScore;
    }
}