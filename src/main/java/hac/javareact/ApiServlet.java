package hac.javareact;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import java.io.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.ServletException;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

/* You can delete this comment before submission - it's only here to help you get started.
Your servlet should be available at "/java_react_war/api/highscores"
assuming you don't modify the application's context path (/java_react_war).
on the client side, you can send request to the servlet using:
fetch("/java_react_warjava_react_war/api/highscores")
*/

@WebServlet(name = "ServletApi", value = "/api/highscores")
public class ApiServlet extends HttpServlet {
    private List<Score> scores = new ArrayList<>();
    public static final String SCORES = "scores.dat";

    public HighScore highScore = new HighScore();;



    /**
     *
     * @param request
     * @param response
     * @throws IOException
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        System.out.println("I'm in get");

        // Read scores from file
        List<Score> scores;
        try (FileInputStream fis = new FileInputStream(getServletContext().getRealPath(".") + "/" + SCORES );
             ObjectInputStream ois = new ObjectInputStream(fis)) {
            scores = (List<Score>) ois.readObject();
        } catch (FileNotFoundException e) {
            // If the file doesn't exist yet, create a new list
            scores = new ArrayList<>();
        } catch (ClassNotFoundException e) {
            throw new IOException("Error reading scores from file: " + e.getMessage());
        }

        // sort scores in descending order
        Collections.sort(scores, Comparator.comparingInt(Score::getScore).reversed());

        // get the top 10 scores
        List<Score> topScores = scores.subList(0, Math.min(scores.size(), 10));

        // print the scores for debugging
        for (Score score : topScores) {
            System.out.println("ram" + score.getUserName() + " : " + score.getScore());
        }

        // convert scores to JSON and send as response
        String json = new Gson().toJson(topScores);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(json);
    }



    /**
     *
     * @param request
     * @param response
     * @throws IOException
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try {
            System.out.println("I'm in post api");
            String requestBody = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
            JsonObject jsonObject = new Gson().fromJson(requestBody, JsonObject.class);
            String userName = jsonObject.get("userName").getAsString();
            int score = jsonObject.get("score").getAsInt();
            Score newScore = new Score(userName, score);

            System.out.println("newScore " + newScore.getUserName());
            if (highScore == null) {
                highScore = new HighScore(); // create a new instance if loading fails
            }
            synchronized (highScore) {
                System.out.println("i try to add score");
                highScore.addScore(newScore);
                highScore.saveToFile(getServletContext().getRealPath(".") + "/" + SCORES ,newScore );
            }
            response.setStatus(HttpServletResponse.SC_CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error processing request");
        }
    }



    @Override
    public void init() throws ServletException {
        //super.init();
        try {
            String scoresPath = getServletContext().getRealPath(".") + "/" + SCORES;
            File file = new File(scoresPath);
            if (!file.exists()) {
                file.createNewFile();
            }
            System.out.println("Path to scores file: " + scoresPath); // <-- added line to print path
            System.out.println("I'm in init api");
            highScore = HighScore.loadFromFile(scoresPath);
        } catch (IOException | ClassNotFoundException e) {
            throw new ServletException("Error loading high scores", e);
        }
    }


    @Override
    public void destroy() {
    }
}
