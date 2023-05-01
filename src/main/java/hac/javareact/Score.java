package hac.javareact;

import java.io.Serializable;

public class Score implements Serializable, Comparable<Score> {
    private final String userName;
    private final int score;

    public Score(String userName, int score) {
        this.userName = userName;
        this.score = score;
    }

    /**
     * @return the userName member
     */
    public String getUserName() {
        return userName;
    }

    public int getScore() {
        return score;
    }

    // compare scores of two Score objects
    @Override
    public int compareTo(Score otherScore) {
        return Integer.compare(score, otherScore.getScore());
    }
}
