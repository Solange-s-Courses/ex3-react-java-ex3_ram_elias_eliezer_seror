package hac.javareact;

import java.io.Serializable;

public class Score implements Serializable, Comparable<Score> {
    private static final long serialVersionUID = 1L;

    private String userName;
    private int score;

    public Score(String userName, int score) {
        this.userName = userName;
        this.score = score;

    }

    public String getUserName() {
        return userName;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    @Override
    public int compareTo(Score otherScore) {
        return Integer.compare(score, otherScore.getScore());
    }
}
