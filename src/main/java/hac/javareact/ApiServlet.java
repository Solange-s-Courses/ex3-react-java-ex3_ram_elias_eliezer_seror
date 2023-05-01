package hac.javareact;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import java.io.*;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.ServletException;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

@WebServlet(name = "ServletApi", value = "/api/highscores")
public class ApiServlet extends HttpServlet {

    public static final String SCORES = "scores.dat";

    public HighScore highScore = new HighScore();

    /**
     * Handles GET requests to the '/api/highscores' endpoint.
     * Reads high scores from a file, sorts them in descending order,
     * and returns the top 5 scores in JSON format.
     *
     * @param request - the HttpServletRequest object representing the client request
     * @param response - the HttpServletResponse object representing the server response
     * @throws IOException - if an I/O error occurs while handling the request or response
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // Read scores from file
        List<Score> scores = new ArrayList<>();
        try (FileInputStream fis = new FileInputStream(getServletContext().getRealPath(".") + "/" + SCORES );
             ObjectInputStream ois = new ObjectInputStream(fis)) {
            scores = (List<Score>) ois.readObject();
        } catch (FileNotFoundException e) {
            // If the file doesn't exist yet, create a new list
            System.out.println("File not found: " + e.getMessage());
        } catch (ClassNotFoundException | IOException e) {
            System.out.println("Error reading scores from file: " + e.getMessage());
        }

        // sort scores in descending order
        scores.sort(Comparator.comparingInt(Score::getScore).reversed());

        // get the top 10 scores
        List<Score> topScores = scores.subList(0, Math.min(scores.size(), 5));

        // convert scores to JSON and send as response
        String json = new Gson().toJson(topScores);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(json);
    }

    /**
     * Handles POST requests to the '/api/highscores' endpoint.
     * Reads a new high score from the request body, adds it to the list of high scores,
     * and saves the updated list to a file.
     * @param request - the HttpServletRequest object representing the client request
     * @param response - the HttpServletResponse object representing the server response
     * @throws IOException - if an I/O error occurs while handling the request or response
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try {
            String requestBody = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
            JsonObject jsonObject = new Gson().fromJson(requestBody, JsonObject.class);
            String userName = jsonObject.get("userName").getAsString();
            int score = jsonObject.get("score").getAsInt();
            Score newScore = new Score(userName, score);

            if (highScore == null) {
                highScore = new HighScore(); // create a new instance if loading fails
            }
            synchronized (ApiServlet.class) {
                highScore.saveToFile(getServletContext().getRealPath(".") + "\\" + SCORES ,newScore );
            }
            response.setStatus(HttpServletResponse.SC_CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error processing request");
        }
    }

    /**
     * Initializes the servlet by loading the high scores from file into memory.
     * If the file does not exist yet, it creates an empty file.
     * @throws ServletException if there is an error loading the high scores
     */
    @Override
    public void init() throws ServletException {
        try {
            String scoresPath = getServletContext().getRealPath(".") + "\\" + SCORES;
            File file = new File(scoresPath);
            if (!file.exists()) {
                file.createNewFile();
            }
            highScore = HighScore.loadFromFile(scoresPath);
        } catch (IOException | ClassNotFoundException e) {
            throw new ServletException("Error loading high scores", e);
        }
    }

    @Override
    public void destroy() {
    }
}
